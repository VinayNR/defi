import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [alertHeading, setAlertHeading] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const connectToWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts !== null && accounts.length > 0) {
      setLoggedIn(true);
      setAccountAddress(accounts[0]);
      setShowAlert(true);
      setAlertHeading('You have logged in successfully!');
      setAlertBody('You have logged into your Metamask primary account. Your session will remain connected on this site, until you manually remove the connected site on top right of the website.');
    }
  };

  const disConnectWallet = async () => {
    // clear account address and logged in user
    setLoggedIn(false);
    setAccountAddress("");
    setShowAlert(true);
    setAlertHeading('You have logged out successfully!');
    setAlertBody('');
  };

  return (
    <>
      <Alert show={showAlert} variant="success" dismissible onClose={() => {setShowAlert(false)}}>
        <Alert.Heading>{alertHeading}</Alert.Heading>
        <p>
          {alertBody}
        </p>
      </Alert>

      <div className="p-3">
        <h1>👋 Welcome to the Truffle + React Box!</h1>
        <p>
          This is everything you need to start using Truffle to write,
          compile, test, and deploy smart contracts, and interact with
          them from a React app.
        </p>

        <h2>Account: {accountAddress}</h2>

        <Button onClick={connectToWallet}>Connect to Wallet</Button>
        <Button onClick={disConnectWallet}>Disconnect from Wallet</Button>
      </div>
      
    </>
  );
}

export default Home;
