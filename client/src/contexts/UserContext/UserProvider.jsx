import { UserContext } from "./UserContext";
import { useState } from "react";
import { initialState } from "./state";


function UserProvider({ children }) {
    const [user, setUser] = useState(initialState);

    const login = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts !== null && accounts.length > 0) {
            setUser({user: {accountAddress: accounts[0], loggedIn: true, nonce: 5}})
            // setAccountAddress(accounts[0]);
            // setShowAlert(true);
            // setAlertHeading('You have logged in successfully!');
            // setAlertBody('You have logged into your Metamask primary account. Your session will remain connected on this site, until you manually remove the connected site on top right of the website.');
        }
    }

    const logout = async () => {
        // clear account address and logged in user
        setUser({user: {}})
        // setAccountAddress("");
        // setShowAlert(true);
        // setAlertHeading('You have logged out successfully!');
        // setAlertBody('');
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
          {children}
        </UserContext.Provider>
    );
}

export default UserProvider;