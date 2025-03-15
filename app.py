from flask import Flask, render_template, request, jsonify

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
