# Overview
This repository contains a simple lending, borrowing, and peer-to-peer (P2P) transfer application built on the Ethereum blockchain. The application consists of three main components:

1. Frontend: This component serves dynamic web pages to users using React.js. Users can interact with the Ethereum blockchain through this interface.
2. Backend: The backend provides REST APIs for storing data securely. It acts as an intermediary between the frontend and the Ethereum blockchain.
3. Smart Contracts: Solidity smart contracts are deployed on the Ethereum blockchain to facilitate P2P transactions and manage a lending pool.



# Usage
The application consists of three components - the front end to serve dynamic pages on the browser (React) and back end that serves REST APIs for storing data. The third component consists of Solidity Smart contracts to facilitate P2P transactions and a lending pool on the chain.

### Smart Contracts
To deploy the smart contracts, run the below commands

On a new terminal, run ganache (Install ganache from node repository if not installed)

Again on a new terminal, run below

```cd truffle/
npm i
truffle compile
truffle migrate
```

### Backend
On a new terminal, run the below commands
```
cd server
python server.py
```

### Frontend
To start the React App locally, clone the repository using SSH or HTTPS

```cd client/
npm i
npm start
```

Navigate to localhost:3000 to see the page
