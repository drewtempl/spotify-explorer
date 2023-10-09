from flask import Flask, jsonify, request
from src.spotify import spotify

app = Flask(__name__)
Spotify = spotify.Spotify()

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

@app.route("/api/genres")
def get_genres():
    response = Spotify.get_genres()
    response = jsonify(response)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/playlist/genres", methods=["POST"])
def create_genre_playlist():
    print(request.data)
    # response = Spotify.get_rec_playlist()
