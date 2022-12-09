from flask import Flask
from flask import render_template, make_response, send_file, request, Response
from flask_cors import CORS, cross_origin
from flask_qrcode import QRcode
import pdfkit
from datetime import datetime
import io
import jsonpickle


from minio import Minio

from lending_cert import LendingCertificate
from config import Config


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
qrcode = QRcode(app)


@app.route("/api/generateCert", methods=["POST"])
@cross_origin()
def generateCert():
    # generate PDF from request body and certificate template
    pool, fromAddress, value, timestamp, lendingHash  = request.json['pool'], request.json['fromAddress'], request.json['value'], request.json['timestamp'], request.json['lendingHash']
    
    cert = LendingCertificate(pool, fromAddress, value, timestamp)

    html = render_template(
        "certificate.html",
        pool=pool, fromAddress=fromAddress, value=value, timestamp=timestamp,
        qrString=str(cert))
    
    pdf = pdfkit.from_string(html, False)

    # store the pdf in the Minio
    minio_client.put_object('certificates', str(lendingHash), io.BytesIO(pdf), len(pdf))

    response = {'File Hash' : lendingHash}
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled, status=200, mimetype="application/json")

@app.route("/api/viewCert", methods=["GET"])
@cross_origin()
def viewCert():

    lendingHash = str(request.args['id'])
    # get from Minio using the hash as the id
    pdf = minio_client.get_object('certificates', lendingHash)
    
    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "inline; filename=cert.pdf"
    return response

if __name__ == "__main__":

    # initialize the minio client for object storage and retrieval
    minio_host = f"{Config.MINIO_SERVICE_HOST}:{Config.MINIO_SERVICE_PORT}"
    minio_user = Config.MINIO_USER
    minio_passwd = Config.MINIO_PASSWD

    minio_client = Minio(minio_host,
                secure=False,
                access_key=minio_user,
                secret_key=minio_passwd)

    app.run(host="0.0.0.0", port=Config.FLASK_PORT)