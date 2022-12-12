import React, { useEffect, useCallback, useReducer } from "react";
import Web3 from "web3";
import { EthContext } from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider);
        web3.currentProvider.setMaxListeners(300);
        web3.eth.net.getId().then(networkID => {
          var { abi }  = artifact[0];
          

          let address, address1, contract, contract_swap;
          try {
            address = artifact[0].networks[networkID].address;
            address1 = artifact[1].networks[networkID].address;
            contract = new web3.eth.Contract(abi, address);
            var { abi } = artifact[1];
            contract_swap = new web3.eth.Contract(abi, address1);

          } catch (err) {
            console.error(err);
          }
          dispatch({
            type: actions.init,
            data: { artifact, web3, networkID, contract, address1, contract_swap }
          });
        });
      }
    }, []);
  
  useEffect(() => {
    const initEthProvider = async() => {
      try {
        const artifact = []
        artifact[0] = require("../../contracts/Pool.json");
        artifact[1] = require("../../contracts/Swap.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    initEthProvider();
  }, [init]);

  return (
    <EthContext.Provider value={{state, dispatch}}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
