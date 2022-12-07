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
          const { abi } = artifact;
          let address, contract;
          try {
            address = artifact.networks[networkID].address;
            contract = new web3.eth.Contract(abi, address);
          } catch (err) {
            console.error(err);
          }
          dispatch({
            type: actions.init,
            data: { artifact, web3, networkID, contract }
          });
        });
      }
    }, []);
  
  useEffect(() => {
    const initEthProvider = async() => {
      try {
        const artifact = require("../../contracts/LiquidityPool.json");
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
