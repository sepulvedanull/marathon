from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

with open('./static/data/runners.json') as f:
    data = json.load(f)


# Set "homepage" to index.html
@app.route('/')
def index():
    return render_template('index.html', data=data)


@app.route('/runners', methods=['GET'])
def runners():
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int("5000"), debug=True)
