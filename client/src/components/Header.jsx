import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import { useState } from "react";
import { useContext } from "react";
import { UserContext } from '../contexts/UserContext/UserContext';


function Header() {

    const {user, login, logout} = useContext(UserContext);

    const [showAlert, setShowAlert] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const [alertHeading, setAlertHeading] = useState('');
    const [alertBody, setAlertBody] = useState('');

    // const login = async () => {
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     if (accounts !== null && accounts.length > 0) {
    //         setLoggedIn(true);
    //         setAccountAddress(accounts[0]);
    //         setShowAlert(true);
    //         setAlertHeading('You have logged in successfully!');
    //         setAlertBody('You have logged into your Metamask primary account. Your session will remain connected on this site, until you manually remove the connected site on top right of the website.');
    //     }
    // }

    // const logout = async () => {
    //     // clear account address and logged in user
    //     setLoggedIn(false);
    //     setAccountAddress("");
    //     setShowAlert(true);
    //     setAlertHeading('You have logged out successfully!');
    //     setAlertBody('');
    // };

    return (
        <>

            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#/home">Home
                        <Badge pill bg="success">
                            Dev
                        </Badge>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#/p2p">P2P</Nav.Link>
                            <Nav.Link href="#/pool">Pool</Nav.Link>
                            <Nav.Link href="#/swap">Swap</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    { !user.user.loggedIn && <Navbar.Text>
                        <Button onClick={login}>Login</Button>
                    </Navbar.Text> }

                    { user.user.loggedIn && 
                        <DropdownButton id="dropdown-basic-button" title="Account">
                            <Dropdown.Item onClick={() => setShowAccount(true)}>Account Details</Dropdown.Item>
                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </DropdownButton>
                    }
                </Container>
            </Navbar>

            <Alert show={showAlert} variant="success" dismissible onClose={() => setShowAlert(false)}>
                <Alert.Heading>Heading</Alert.Heading>
                <p>Body</p>
            </Alert>

            <Modal show={showAccount} onHide={() => setShowAccount(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Account Address: {user.user.accountAddress}
                    <br/>
                    Nonce: {user.user.nonce}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAccount(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    );
}

export default Header;
