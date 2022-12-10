import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import p2ppng from "../images/p2p.png"
import poolpng from "../images/pool.png"
import swappng from "../images/swap.png"


function Home() {
  
  return (
    <>
      <div className="p-3 text-center">
        <h1>Decentralized Finance using Blockchain</h1>
        <p>
          This application lets you send cryptocurrency tokens
          to friends, allows you to swap tokens that you own and
          provides a pool of tokens for interested investors to lend and borrow from.
        </p>

        <Container fluid>
          <Card className="text-center">
            <Card.Header>P2P Transact</Card.Header>
            <Card.Body>
              <img height={90} width={90} src={p2ppng} alt=""/><br/>
              <Card.Title>Peer to Peer Account Transact ETH</Card.Title>
              <Card.Text>
                Use the Peer to Peer transact feature to send ETH (or other tokens you own) to your friends over the Blockchain or to your own account addresses
              </Card.Text>
              
              <Button variant="primary">
                <Nav.Link href="#/p2p">P2P Transact</Nav.Link>
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">Powered by Ganache</Card.Footer>
          </Card>

          <Row xs={1} md={2} className="m-5">
            <Col>
              <Card className="text-center">
                <Card.Body>
                <img className="m-2" height={50} width={50} src={poolpng} alt=""/>
                  <Card.Title>Lending Pool</Card.Title>
                  <Card.Text>
                    Invest into a lending pool to earn interest or borrow from it.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">
                    <Nav.Link href="#/pool">Explore Lending Pool</Nav.Link>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="text-center">
                <Card.Body>
                <img className="m-2" height={50} width={50} src={swappng} alt=""/>
                  <Card.Title>Swap Token</Card.Title>
                  <Card.Text>
                    Swap tokens that you own into Fiat Currency and vice-versa
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">
                    <Nav.Link href="#/swap">Explore Swap Token</Nav.Link>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        
      </div>
    </>
  );
}

export default Home;
