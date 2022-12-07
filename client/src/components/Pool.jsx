import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { EthContext } from '../contexts/EthContext/EthContext';
import { UserContext } from '../contexts/UserContext/UserContext';
import { PoolContext } from '../contexts/PoolContext/PoolContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import p2ppng from "../images/pool.png"

function Pool() {
    const { state: { web3, contract } } = useContext(EthContext);
    const { lendingEntries, borrowingEntries, updateEntries } = useContext(PoolContext);
    const { user } = useContext(UserContext);
    const [ethValue, setEthValue] = useState("0");
    const [contractBalance, setContractBalance] = useState("");    

    const handleEthChange = e => {
        setEthValue(e.target.value);
    };

    useEffect(() => {
        async function update() {
            await updateEntries(contract, user.user.accountAddress);
            await getBalance();
        }
        console.log("useEffect", contract, user);

        if(web3 && contract && user && user.user && user.user.accountAddress)
            update();
    },
    [JSON.stringify(lendingEntries), JSON.stringify(borrowingEntries), contractBalance]);
    
    const lend = async () => {
        console.log("lend", contract, user);
        await contract.methods.lend(Date.now()).send({ from: user.user.accountAddress, value: web3.utils.toWei(ethValue, "ether") });
        await updateEntries(contract, user.user.accountAddress);
    };

    const borrow = async () => {
        await contract.methods.borrow(web3.utils.toWei(ethValue, "ether"), Date.now()).send({ from: user.user.accountAddress });
        await updateEntries(contract, user.user.accountAddress);
    };

    const getBalance = async () => {
        const balance = await contract.methods.getContractBalance().call({ from: user.user.accountAddress });
        setContractBalance(web3.utils.fromWei(balance, 'ether'));
    };

    return (
        <>
            <Container className="mt-2">
                <Row className="mt-2">
                    <Col/>
                    <Col xs={10} md={10} lg={10}>
                        <Card className="text-center">
                            <Card.Header>Lend and Borrow Crypto</Card.Header>
                            <Card.Body>
                                <Card.Title>Lending Pool</Card.Title>
                                <img height={90} width={90} src={p2ppng} alt=""/><br/>

                                <Card.Text className="blockquote">
                                    Pool balance: {contractBalance} ETH
                                </Card.Text>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formAmount">
                                        <Form.Label>Amount (in ETH)</Form.Label>
                                        <Form.Control onChange={handleEthChange} type="text" placeholder="Enter amount in ETH" />
                                    </Form.Group>

                                    <ButtonToolbar className='justify-content-center'>
                                        <ButtonGroup className="me-2">
                                            <Button onClick={lend} variant="primary" type="submit">
                                                Lend
                                            </Button>
                                        </ButtonGroup>

                                        <ButtonGroup className="me-2">
                                            <Button onClick={borrow} variant="primary" type="submit">
                                                Borrow
                                            </Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                    
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
                                    <Accordion.Header>Lend Transactions</Accordion.Header>
                                    <Accordion.Body>
                                        <Table responsive striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Amount</th>
                                                    <th>Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <LendingEntryList entries={lendingEntries} updateEntries={updateEntries} web3={web3} />
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    <Col/>
                </Row>
                
                <Row className="mt-2">
                    <Col/>
                        <Col xs={10} md={10} lg={10}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Borrow Transactions</Accordion.Header>
                                    <Accordion.Body>
                                        <Table responsive striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Amount</th>
                                                    <th>Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <BorrowingEntryList entries={borrowingEntries} updateEntries={updateEntries} web3={web3} />
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

function LendingEntry({ index, entry, web3 }) {
    const { state: { contract } } = useContext(EthContext);
    const { user } = useContext(UserContext);
    const [lenderBalance, setLenderBalance] = useState(0);
    const { updateEntries } = useContext(PoolContext);

    const getLenderBalance = async () => {
        console.log(index, user.user.accountAddress, contract);
        const balance = await contract.methods.getLenderBalance(index, Date.now()).call({ from: user.user.accountAddress });
        console.log(balance);
        setLenderBalance(balance);
    }

    useEffect(() => { async function getBalance(index) {
        await getLenderBalance(index, Date.now());
    }
    getBalance(index);
}, []);

    const withdraw = async () => {
        await contract.methods.withdraw(index, Date.now()).send({ from: user.user.accountAddress });
        await updateEntries(contract, user.user.accountAddress);
    }

    return (
        <tr key = {index}>
            <td > { index } </td>
            <td> { web3.utils.fromWei(entry, 'ether') } ETH </td>
            <td> { web3.utils.fromWei(lenderBalance.toString(), 'ether') }
                                                <ButtonGroup className="me-2 float-end">
                                                    <Button onClick={getLenderBalance} variant="primary" type="submit">
                                                        Update Balance
                                                    </Button>
                                                </ButtonGroup>

                                                <ButtonGroup className="me-2 float-end">
                                                    <Button onClick={withdraw} variant="primary" type="submit">
                                                        Withdraw
                                                    </Button>
                                                </ButtonGroup> </td>
        </tr>
    );
}

function LendingEntryList({ entries, web3 }) {
    const items =  entries.map((entry, index) =>
        <LendingEntry key={index} index={index} entry={entry} web3={web3} />
    );

    return items;
}

function BorrowingEntry({ index, entry, web3 }) {
    const { state: { contract } } = useContext(EthContext);
    const { user } = useContext(UserContext);
    const [borrowerBalance, setBorrowerBalance] = useState(0);
    const { updateEntries } = useContext(PoolContext);

    const getBorrowerBalance = async () => {
        const balance = await contract.methods.getBorrowerBalance(index, Date.now()).call({ from: user.user.accountAddress });
        setBorrowerBalance(balance);
    }

    useEffect(() => { async function getBalance() {
            await getBorrowerBalance();
        }
        getBalance();
    }, []);

    const payback = async () => {
        const borrowerBalance = await contract.methods.getBorrowerBalance(index, Date.now()).call({ from: user.user.accountAddress });
        console.log((Number(borrowerBalance)).toString());
        await contract.methods.payback(index, Date.now()).send({ from: user.user.accountAddress, value: (Number(borrowerBalance)).toString() });
        await updateEntries(contract, user.user.accountAddress);
    }

    return (
        <tr key = {index}>
            <td > { index } </td>
            <td> { web3.utils.fromWei(entry, 'ether') } ETH </td>
            <td> { web3.utils.fromWei(borrowerBalance.toString(), 'ether') } 
                                                <ButtonGroup className="me-2 float-end">
                                                    <Button onClick={getBorrowerBalance} variant="primary" type="submit">
                                                        Update Balance
                                                    </Button>
                                                </ButtonGroup>

                                                <ButtonGroup className="me-2 float-end">
                                                    <Button onClick={payback} variant="primary" type="submit">
                                                        Payback
                                                    </Button>
                                                </ButtonGroup> </td>
        </tr>
    );
}

function BorrowingEntryList({ entries, web3 }) {
    const items =  entries.map((entry, index) =>
        <BorrowingEntry key={index} index={index} entry={entry} web3={web3} />
    );

    return items;
}

export default Pool;