from flask import Flask, jsonify, request, session
from src.openai import openai
from src.spotify import spotify
from src.spotify import authorization
import json


app = Flask(__name__)
app.secret_key = 'hello'
auth = authorization.Authorization(session)
Spotify = spotify.Spotify()
OpenAI = openai.OpenAI()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/login")
def login():
    url = auth.get_url()
    response = jsonify(url)

    return response


@app.route("/api/auth")
def authenticate():
    # print(request)
    code = request.args.get('code')
    Spotify.set_auth(code)

    # user = Spotify.get_user()

    # print(user)

    return "<script>window.parent.location.reload();window.close()</script>"


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


@app.route("/api/create-playlist/recommendations", methods=['POST'])
def creat_rec_playlist():
    response = Spotify.get_rec_playlist()

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


@app.route("/api/recommendations/genres")
def get_genre_recommendations():
    # print(request.args)

    response = Spotify.get_rec_tracks(
        request.args, request.args.get('limit'))
    
    # response = jsonify(tracks)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    # return []


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
