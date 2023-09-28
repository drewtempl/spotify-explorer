from flask import Flask, jsonify
from src.spotify import spotify

app = Flask(__name__)
Spotify = spotify.Spotify()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/user")
def user():
    print('HELLO!!!')
    user = Spotify.get_user()
    response = jsonify(user)


    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/top-tracks/<time_range>")
def top_tracks(time_range):
    tracks = Spotify.get_top_tracks(20, time_range)

    response = jsonify(tracks)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/create-playlist/<timeframe>/<count>", methods=['POST'])
def make_playlist(timeframe, count):
    response = Spotify.create_playlist(timeframe, count)

    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
