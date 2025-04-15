from flask import Flask, render_template, request, jsonify
from web3 import Web3

app = Flask(__name__)

# Connect to a blockchain node (e.g., Infura)
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/balance/')

')
def get_balance(address):
    balance = w3.eth.get_balance(address)
    return {'balance': w3.from_wei(balance, 'ether')}

if __name__ == '__main__':
    app.run(debug=True)

app = Flask(__name__)

# Home Route
@app.route("/")
def home():
    return render_template("index.html")

# Booking Route
@app.route("/booking")
def booking():
    return render_template("booking.html")

# Marketplace Route
@app.route("/marketplace")
def marketplace():
    return render_template("marketplace.html")

# Handle user sign-up (HTMX)
@app.route("/signup", methods=["POST"])
def signup():
    username = request.form.get("username")
    password = request.form.get("password")
    return jsonify({"message": f"Welcome, {username}!"})

if __name__ == "__main__":
    app.run(debug=True)
