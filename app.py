from flask import Flask, render_template, request, jsonify
from web3 import Web3
import os

app = Flask(__name__, template_folder='templates', static_folder='static')

# Connect to Monad testnet
MONAD_RPC_URL = os.getenv('https://testnet-rpc.monad.xyz', 'https://testnet-rpc.monad.xyz')
w3 = Web3(Web3.HTTPProvider('https://testnet-rpc.monad.xyz'))

# Home Route
@app.route('/')
def index():
    return render_template('approval.html')

# Balance Route
@app.route('/balance/<address>')
def get_balance(address):
    try:
        balance = w3.eth.get_balance(address)
        return jsonify({'balance': w3.from_wei(balance, 'ether')})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Booking Route
@app.route('/booking')
def booking():
    return render_template('booking.html')

# Marketplace Route
@app.route('/marketplace')
def marketplace():
    return render_template('marketplace.html')

# Handle user sign-up (HTMX)
@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('username')
    password = request.form.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    return jsonify({'message': f'Welcome, {username}!'})

if __name__ == '__main__':
    app.run(debug=True)
