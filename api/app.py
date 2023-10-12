from flask import Flask, jsonify, request
from src.spotify import spotify
from src.openai import openai
import json


app = Flask(__name__)
Spotify = spotify.Spotify()
OpenAI = openai.OpenAI()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/login")
def login():
    url = Spotify.get_auth_url()
    response = jsonify(url)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/auth")
def auth():
    code = request.args.get('code')
    Spotify.set_auth(code)

    # user = Spotify.get_user()

    # print(user)

    return "<script>window.parent.location.reload();window.close()</script>"

    response = jsonify(user)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/user")
def user():
    user = Spotify.get_user()
    response = jsonify(user)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/top-tracks")
def top_tracks():
    tracks = Spotify.get_top_tracks(request.args.get(
        'count'), request.args.get('timeframe'))

    response = jsonify(tracks)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/create-playlist/<timeframe>/<count>", methods=['POST'])
def make_playlist(timeframe, count):
    response = Spotify.create_playlist(timeframe, count)

    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/genres")
def get_genres():
    response = Spotify.get_genres()
    response = jsonify(response)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/playlist/genres", methods=["POST"])
def create_genre_playlist():
    response = Spotify.get_rec_playlist(
        request.json['genres'], request.json['limit'])

    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/openai")
def create_ai_playlist():
    response = OpenAI.send_prompt('deep house playlist with 3 tracks')

    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
