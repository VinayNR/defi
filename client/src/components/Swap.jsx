import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';

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

const { state: { web3 } } = useContext(EthContext);
const { user } = useContext(UserContext);


function Swap() {
    
    const [states, setStates] = useState(0);
    const [input, setInput] = useState(0);
    const [i,setI] = useState(0);
    const [inp, setInp] = useState(0);
    const [searchTerm, setSearchTerm] = useState(0);

    const { state: { web3, contract } } = useContext(EthContext);
    const { user } = useContext(UserContext);

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
        
        const elem2 = document.getElementById('elem2');
        const a = Number(inp);
        const b = Number(searchTerm);
        const c = a*b;

        if(isNaN(searchTerm) || isNaN(inp))
            elem2.value=0;
        else
            elem2.value=c;

        // Send Axios request here
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
    
        const elem = document.getElementById('elem1');
        const a = Number(inp);
        const b = Number(input);
        let c = 0;

        if(a==0)
        {    
            c = 0;
        }
        else
        {   
            c = b/a;
        }

        if(isNaN(input) || isNaN(inp))
            elem.value=0;
        else
            elem.value=c;

        // Send Axios request here
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
    }, [input])

    const retValue = e => {
        //console.log(input);
        if(isNaN(e.target.value))
        {   
            setInput(0);
        }
        else
        {   
            setInput(e.target.value);
        }
    }

    const retVal = e => {
        if(isNaN(e.target.value))
        {   
            setSearchTerm(0);
            console.log("NaN");
        }
        else
        {   
            setSearchTerm(e.target.value);
            console.log("not NaN");
        }
    }


    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (
            await fetch(
            "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
            )
          ).json();
                
          console.log(data.data.rates.USD)
          // set state when the data received

          setInp((data.data.rates.USD));
        };
    
        dataFetch();
      }, [searchTerm,input]);

    const onClickButton = e => {

        const elem = document.getElementById('elem1');
        if(elem.value > user.user.balance)
            console.log("transaction not possible due to insufficient funds");
        else
            console.log("transaction successful");
        //const URL = "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
        //const result = e.target.value.replace(/\D/g, '');


        //const k = parseInt({input},10)
        //setInp(k*5)
    
    }

    const send = async () => {
        await web3.eth.sendTransaction({from: user.user.accountAddress, to: toAddress, value: web3.utils.toWei(ethValue, "ether")});
    }


    const zero = 0;

    return (
        <>
            <Container className="mt-2">
                <Row>
                <Col/>
                <Col xs={6}>
                    <Card className="text-center">
                        <Card.Header>Enter amount in Ether</Card.Header>
                        <Card.Body>
                            <Card.Title>Add or withdraw Ether to or from your Metamask Wallet</Card.Title>
                            <img height={90} width={90} src={p2ppng} alt=""/><br/>
                            <Card.Text>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Enter Ether to be converted</Form.Label>
                                    <Form.Control id="elem1" onChange={retVal} type="text" placeholder="Enter Ether amount" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                    <Form.Label>Amount (in USD)</Form.Label>
                                    <Form.Control id="elem2" onChange={retValue} type="text" placeholder="Enter Ether amount"/>
                                    </Form.Group>

                                    <Button /*onClick={send}*/ variant="primary" type="submit">
                                            Send
                                    </Button>
                                    
                            </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col/>
                </Row>
            </Container>    
        </>
    );
}

export default Swap;