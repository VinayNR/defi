import React, { useEffect } from 'react';

import { useState, useContext } from "react";
import { EthContext } from '../contexts/EthContext/EthContext';
import { UserContext } from '../contexts/UserContext/UserContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

import p2ppng from "../images/p2p.png"

function P2P() {

    const [transactions, setTransactions] = useState(<></>);

    const { state: { web3 } } = useContext(EthContext);
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

    useEffect(() => {

        async function getTransactionsByAccount(accountAddress, startBlockNumber, endBlockNumber) {
            let transactions = [];
            if (accountAddress !== null & accountAddress !== undefined) {
                if (startBlockNumber == null) {
                    startBlockNumber = endBlockNumber - 1000 > 0 ? endBlockNumber - 1000 : 0;
                }
                if (endBlockNumber == null) {
                    endBlockNumber = await web3.eth.getBlockNumber();
                }
                console.log("Searching for transactions to/from account \"" + accountAddress + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
                
                for (let i = startBlockNumber; i <= endBlockNumber; i++) {
                    let block = await web3.eth.getBlock(i, true);
                    if (block != null && block.transactions != null) {
                        block.transactions.forEach( function(e) {
                            console.log(accountAddress, e);
                            if (accountAddress === "*" || accountAddress === e.from.toLowerCase() || (e.to !== null && accountAddress === e.to.toLowerCase())) {
                                transactions.push(<tr key = {e.hash}>
                                    <td > { i } </td>
                                    <td> { e.from } </td>   
                                    <td> { e.to }</td>
                                    <td> { web3.utils.fromWei(e.value, "ether") }</td>
                                    <td> { e.gas } </td>   
                                    <td> { e.blockNumber }</td>
                                    <td> { new Date(block.timestamp * 1000).toGMTString() }</td>
                                </tr>);
                            }
                        });
                    }
                }
                setTransactions(transactions);
            }
        }

        getTransactionsByAccount(user.user.accountAddress);        
    }, [user.user.accountAddress]);

    return (
        <>
            <Container className="mt-2">
                <Row className="mt-2">
                    <Col/>
                    <Col xs={10} md={10} lg={10}>
                        <Card className="text-center">
                            <Card.Header>Send Crypto</Card.Header>
                            <Card.Body>
                                <Card.Title>Transact Peer to Peer using Wallets</Card.Title>
                                <img height={90} width={90} src={p2ppng} alt=""/><br/>
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
                            </Card.Body>
                            <Card.Footer className="text-muted">Powered by Ganache</Card.Footer>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
                
                <Row className="mt-2">
                    <Col/>
                    <Col xs={10} md={10} lg={10}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Transaction History</Accordion.Header>
                                <Accordion.Body>
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>From Address</th>
                                                <th>To Address</th>
                                                <th>Value</th>
                                                <th>Gas Price</th>
                                                <th>Block Number</th>
                                                <th>Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions}
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
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