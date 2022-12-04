import { UserContext } from "./UserContext";
import { useState, useCallback } from "react";
import { initialState } from "./state";
import Web3 from "web3";


function UserProvider({ children }) {
    const [user, setUser] = useState(initialState);
    const [alert, setAlert] = useState({heading: '', body: ''});
    const [showAlert, setShowAlert] = useState(false);

    const login = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts !== null && accounts.length > 0) {
            const accountBalance = await window.ethereum.request({method: 'eth_getBalance', params:[accounts[0], "latest"]});
            const accountTxnCount = await window.ethereum.request({method: 'eth_getTransactionCount', params:[accounts[0], "latest"]});
            setUser({user: {accountAddress: accounts[0], nonce: Web3.utils.hexToNumber(accountTxnCount), balance: Web3.utils.fromWei(accountBalance, "ether"), loggedIn: true}});
            setAlert({heading: 'Successfully Logged In!', body: 'You have successfully logged into your primary Metamask account. To force disconnect, proceed to \'connected sites\' on top right of this site'});
            setShowAlert(true);
        }
    }

    const logout = useCallback(
        async () => {
            // clear account address and logged in user
            setUser({user: {}});
            setAlert({heading: 'Successfully Logged Out!', body: 'You have logged out of your metamask account'});
            setShowAlert(true);
        }, []
    );
    
    

    return (
        <UserContext.Provider value={{user, alert, login, logout, showAlert, setShowAlert}}>
          {children}
        </UserContext.Provider>
    );
}

export default UserProvider;