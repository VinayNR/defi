import React, { useState } from "react";
import Web3 from "web3";
import { EthContext } from "./EthContext";

function EthProvider({ children }) {

  let web3, artifact;

  const [ networkID, setNetworkID ] = useState(null);
  const [ contract, setContract ] = useState(null);

  const init = async artifact => {
    if (artifact) {
      // initialize web3
      web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      
      web3.eth.net.getId().then((netId) => {
        setNetworkID(netId);
        const { abi } = artifact;
        try {
          const address = artifact.networks[netId].address;
          const contr = new web3.eth.Contract(abi, address);
          setContract(contr);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }

  try {
    artifact = require("../../contracts/SimpleStorage.json");
    init(artifact);
  } catch (err) {
    console.error(err);
  }

  return (networkID !== null) && (contract !== null) && (
    <EthContext.Provider value={{ artifact, web3, networkID, contract }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
