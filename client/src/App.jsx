import UserProvider from "./contexts/UserContext/UserProvider";
import PoolProvider from "./contexts/PoolContext/PoolProvider";

import Header from "./components/Header";
import Home from "./components/Home.jsx";
import P2P from "./components/P2P.jsx";
import Pool from "./components/Pool.jsx";
import Swap from "./components/Swap.jsx";
import Footer from "./components/Footer";
import "./App.css";

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import EthProvider from "./contexts/EthContext/EthProvider";


function App() {
  
  return (
    <>
      <UserProvider>
        <EthProvider>
          <PoolProvider>
            <Header />
              <Router>
                <Routes>
                  <Route exact path='/' element={<Home />}></Route>
                  <Route exact path='/home' element={<Home />}></Route>
                  <Route exact path='/p2p' element={<P2P />}></Route>
                  <Route exact path='/pool' element={<Pool />}></Route>
                  <Route exact path='/swap' element={<Swap />}></Route>
                </Routes>
              </Router>
            <Footer />
          </PoolProvider>
        </EthProvider>
      </UserProvider>
    </>
  );
}

export default App;
