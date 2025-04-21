// static/js/web3.js
import Web3 from 'web3';

async function switchToMonad() {
try {
await window.ethereum.request({
method: 'wallet_switchEthereumChain',
params: [{ chainId: '0x279F' }], // Replace with Monad testnet chain ID
});
} catch (switchError) {
if (switchError.code === 4902) {
await window.ethereum.request({
method: 'wallet_addEthereumChain',
params: [{
chainId: '0x279F', // Monad testnet chain ID
chainName: 'Monad Testnet',
rpcUrls: ['https://testnet-rpc.monad.xyz'], // Monad testnet RPC
nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
blockExplorerUrls: ['https://testnet.monadexplorer.com'], // Optional
}],
});
} else {
console.error('Network switch failed:', switchError);
throw switchError;
}
}
}

async function connectWallet() {
console.log('Connect Wallet button clicked');
if (!window.ethereum) {
alert('Please install MetaMask!');
return null;
}
try {
await switchToMonad();
const web3 = new Web3(window.ethereum);
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
console.log('Connected:', accounts[0]);
document.getElementById('wallet-status').textContent = `Connected: ${accounts[0].slice(0, 6)}...`;
return accounts[0];
} catch (error) {
console.error('Connection failed:', error);
alert('Failed to connect wallet. Check console for details.');
return null;
}
}

document.addEventListener('DOMContentLoaded', () => {
const connectButton = document.getElementById('connect-wallet');
if (connectButton) {
connectButton.addEventListener('click', connectWallet);
} else {
console.error('Connect Wallet button not found');
}
});
