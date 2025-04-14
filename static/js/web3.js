// static/js/web3.js
import Web3 from 'web3';

async function connectWallet() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            console.log('Connected:', accounts[0]);
            return accounts[0];
        } catch (error) {
            console.error('Connection failed:', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

document.getElementById('connect-wallet').addEventListener('click', connectWallet);
