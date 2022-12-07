import React from 'react';
import { useEffect, useState, useContext } from "react";
import { EthContext } from '../contexts/EthContext/EthContext';
import { UserContext } from '../contexts/UserContext/UserContext';

function Pool() {
    const { state: { web3, contract, accounts } } = useContext(EthContext);
    const { user } = useContext(UserContext);
    const [ethValue, setEthValue] = useState("0");
    const [contractBalance, setContractBalance] = useState("");
    const [lendingEntries, setLendingEntries] = useState([]);
    const [borrowingEntries, setBorrowingEntries] = useState([]);

    const handleEthChange = e => {
        setEthValue(e.target.value);
    };

    const updateEntries = async () => {
        const lenderEntries = await contract.methods.getLenderEntries().call({ from: user.user.accountAddress });
        console.log('lenderEntries', lenderEntries);
        setLendingEntries(lenderEntries);
        const borrowerEntries = await contract.methods.getBorrowerEntries().call({ from: user.user.accountAddress });
        console.log('borrowerEntries', borrowerEntries);
        setBorrowingEntries(borrowerEntries);
    }
    
    useEffect(() => {
        async function update() {
            await updateEntries();
        }
        update();
    },
    [JSON.stringify(lendingEntries), JSON.stringify(borrowingEntries)]);
    
    const lend = async () => {
        await contract.methods.lend(Date.now()).send({ from: user.user.accountAddress, value: web3.utils.toWei(ethValue, "ether") });
        updateEntries();
    };

    const borrow = async () => {
        await contract.methods.borrow(web3.utils.toWei(ethValue, "ether"), Date.now()).send({ from: user.user.accountAddress });
        updateEntries();
    };

    const getBalance = async () => {
        const balance = await contract.methods.getContractBalance().call({ from: user.user.accountAddress });
        setContractBalance(balance);
    };

    return (
        <div className="btns">
            <hr/>
            <LendingEntryList entries={lendingEntries} updateEntries={updateEntries} />
            <hr />
            <BorrowingEntryList entries={borrowingEntries} updateEntries={updateEntries} />
            <hr />
            <input
                type="text"
                placeholder="uint"
                value={ethValue}
                onChange={handleEthChange}
            />
            <button onClick={lend}>
                lend()
            </button>

            <button onClick={borrow}>
                borrow()
            </button>

            <p>{contractBalance}</p>
            <button onClick={getBalance}>
                checkContractBalance()
            </button>

        </div>
    );
}

function LendingEntry({ index, entry, updateEntries }) {
    const { state: { contract } } = useContext(EthContext);
    const { user } = useContext(UserContext);
    const [lenderBalance, setLenderBalance] = useState(0);

    const getLenderBalance = async () => {
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
        updateEntries();
    }

    return (
        <li key={index}> {entry}
            <button onClick={getLenderBalance}>checkWithdrawalAmount</button>
            <p>Lender balance = {lenderBalance}</p>
            <button onClick={withdraw}>withdraw()</button>
        </li>
    );
}

function LendingEntryList({ entries, updateEntries }) {
    const listItems = entries.map((entry, index) =>
        <LendingEntry key={index} index={index} entry={entry} updateEntries={updateEntries}/>
    );

    return (
        <ul>
            {listItems}
        </ul>
    );
}

function BorrowingEntry({ index, entry, updateEntries }) {
    const { state: { contract } } = useContext(EthContext);
    const { user } = useContext(UserContext);
    const [borrowerBalance, setBorrowerBalance] = useState(0);

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
        console.log((Number(borrowerBalance) + 1000000000000000).toString());
        await contract.methods.payback(index, Date.now()).send({ from: user.user.accountAddress, value: (Number(borrowerBalance) + 11000000000000000).toString() });
        updateEntries();
    }

    return (
        <li key={index}> {entry}
            <button onClick={getBorrowerBalance}>checkPaybackAmount</button>
            <p>Borrower balance = {borrowerBalance}</p>
            <button onClick={payback}>payback()</button>
        </li>
    );
}

function BorrowingEntryList({ entries, updateEntries }) {
    const listItems = entries.map((entry, index) =>
        <BorrowingEntry key={index} index={index} entry={entry} updateEntries={updateEntries} />
    );

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export default Pool;