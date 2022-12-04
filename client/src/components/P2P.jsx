import React from 'react';

import { useState, useContext } from "react";
import { EthContext } from '../contexts/EthContext/EthContext';
import { UserContext } from '../contexts/UserContext/UserContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import p2ppng from "../images/p2p.png"
import { useMemo } from 'react';

function P2P() {

    console.log('P2P');

    // const { web3, contract, networkID } = useContext(EthContext);
    const { state: { web3, contract } } = useContext(EthContext);
    const { user } = useContext(UserContext);

    const [ethValue, setEthValue] = useState("");
    const [toAddress, setToAddress] = useState("");

    const handleEthChange = e => {
        setEthValue(e.target.value);
    };

    const handleToAccountChange = e => {
        setToAddress(e.target.value);
    };

    const send = async () => {
        await web3.eth.sendTransaction({from: user.user.accountAddress, to: toAddress, value: web3.utils.toWei(ethValue, "ether")});
    }

    return (
        <>
            <Container className="mt-2">
                <Row>
                    <Col/>
                    <Col xs={6}>
                        <Card className="text-center">
                            <Card.Header>Send Crypto</Card.Header>
                            <Card.Body>
                                <Card.Title>Transact Peer to Peer using Wallets</Card.Title>
                                <img height={90} width={90} src={p2ppng} alt=""/><br/>
                                <Card.Text>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formAccountAddress">
                                            <Form.Label>Account Address</Form.Label>
                                            <Form.Control onChange={handleToAccountChange} type="text" placeholder="Enter account address" />
                                            <Form.Text className="text-muted">
                                                This address is the public wallet account address of the recipient
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAmount">
                                            <Form.Label>Amount (in ETH)</Form.Label>
                                            <Form.Control onChange={handleEthChange} type="text" placeholder="Enter amount in ETH" />
                                        </Form.Group>

                                        <Button onClick={send} variant="primary" type="submit">
                                            Send
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">Powered by Ganache</Card.Footer>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </>
    );       
}

export default P2P;


/*
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xdE611F5A52A5fC09f3AF833F6264862a9D655183", "latest"],"id":1}' 127.0.0.1:8545
*/