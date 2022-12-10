import os

class Config(object):

        MINIO_SERVICE_HOST = os.environ.get('MINIO_SERVICE_HOST') or 'localhost'
        MINIO_SERVICE_PORT = os.environ.get('MINIO_SERVICE_PORT') or 9000
        MINIO_USER = "rootuser"
        MINIO_PASSWD = "rootpass123"

        FLASK_PORT = os.environ.get('FLASK_PORT') or 5000