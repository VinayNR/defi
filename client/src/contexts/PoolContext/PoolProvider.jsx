import { PoolContext } from "./PoolContext";
import { useState } from "react";
import { initialState } from "./state";


function PoolProvider({ children }) {
    const [lendingEntries, setLendingEntries] = useState(initialState);
    const [borrowingEntries, setBorrowingEntries] = useState(initialState);

    const updateEntries = async (contract, address) => {
        console.log(contract);
        const lenderEntries = await contract.methods.getLenderEntries().call({ from: address });
        console.log('updateEntries lenderEntries', lenderEntries);
        setLendingEntries(lenderEntries);
        const borrowerEntries = await contract.methods.getBorrowerEntries().call({ from: address });
        console.log('updateEntries borrowerEntries', borrowerEntries);
        setBorrowingEntries(borrowerEntries);
    }
    
    

    return (
        <PoolContext.Provider value={{lendingEntries, borrowingEntries, updateEntries}}>
          {children}
        </PoolContext.Provider>
    );
}

export default PoolProvider;