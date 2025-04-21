// static/js/web3.js
import Web3 from 'web3';

async function switchToMonad() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x279F' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x279F',
                        chainName: 'Monad Testnet',
                        rpcUrls: ['https://testnet-rpc.monad.xyz'],
                        nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
                        blockExplorerUrls: ['https://testnet.monadexplorer.com'],
                    }],
                });
            } catch (addError) {
                console.error('Failed to add Monad network:', addError);
                throw addError;
            }
        } else {
            console.error('Network switch failed:', switchError);
            throw switchError;
        }
    }
}

async function connectWallet() {
    console.log('Connect Wallet button clicked');
    if (!window.ethereum) {
        alert('Please install MetaMask to connect your wallet!');
        return null;
    }
    try {
        await switchToMonad();
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            alert('No accounts found. Please unlock MetaMask.');
            return null;
        }
        const address = accounts[0];
        console.log('Connected:', address);
        document.getElementById('wallet-status').textContent = `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
        return address;
    } catch (error) {
        console.error('Connection failed:', error);
        alert(`Failed to connect wallet: ${error.message || 'Unknown error'}. Check console for details.`);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-wallet');
    if (connectButton) {
        connectButton.addEventListener('click', connectWallet);
    } else {
        console.error('Connect Wallet button not found. Ensure #connect-wallet exists in index.html');
    }
});
