from flask import Flask, jsonify
from src.spotify import spotify

app = Flask(__name__)
Spotify = spotify.Spotify()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/user")
def user():
    user = Spotify.get_user()
    response = jsonify(user)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

