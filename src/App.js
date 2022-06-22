import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

import { ethers } from "ethers";

const CONTRACT_ADDRESS = '0xb5aC181F8C523B784e401ea31Bca89bfc5d4f283';

const CONTRACT_ABI = [
    "function buyToken() public virtual payable"
];

function App() {

    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);

    const [transactionHash, setTransactionHash] = useState('');

    async function connectToWallet() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider .send('eth_requestAccounts', []);
        setAddress(accounts[0]);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
    };

    async function makeTransaction() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // call buyToken, sending 1 ether in the transaction
        try { 
            const tx = await contract.buyToken({
                value: ethers.utils.parseEther('.01')
            });
            console.log(tx);
            setTransactionHash(<a href={`https://${provider.network.name}.etherscan.io/tx/${tx.hash}`}>{tx.hash}</a>);
        } catch (error) {
            if (error.code === 4001) {
                setTransactionHash('User rejected transaction');
            } else {
                setTransactionHash('Transaction failed');
            }
            console.log(error);
        }

    }

    useEffect(() => {
        connectToWallet();
    }, []);

    return (
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Your address: {address}
        </p>
        <p>
        Your balance: {balance}
        </p>
        <button onClick={makeTransaction}>Buy Token</button>

        {transactionHash ? <p>Transaction hash: {transactionHash}</p> : <p></p>}

        </header>
        </div>
    );
}

export default App;
