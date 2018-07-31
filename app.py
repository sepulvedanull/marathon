from flask import Flask, render_template, request, jsonify
from scraper import parse_results

app = Flask(__name__)

# Set "homepage" to index.html
@app.route('/')
def index():
    d = parse_results()
    return jsonify(d)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int("5000"), debug=True)