import React from 'react';

import { useState, useContext } from "react";
import { EthContext } from '../contexts/EthContext/EthContext';
import { UserContext } from '../contexts/UserContext/UserContext';

function P2P() {

    const { web3, contract, networkID } = useContext(EthContext);
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
            <div className="btns">
                <div className="send-form">
                <input
                    type="text"
                    placeholder="Receiver"
                    value={toAddress}
                    onChange={handleToAccountChange}
                />
                <input
                    type="text"
                    placeholder="uint"
                    value={ethValue}
                    onChange={handleEthChange}
                />
                <button onClick={send}>
                    send()
                </button>
                </div> 
            </div>
        </>
    );
}

export default P2P;