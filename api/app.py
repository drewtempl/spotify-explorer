from flask import Flask, jsonify, request
from src.openai import openai
from src.spotify import spotify
from src.spotify import authorization
import json


app = Flask(__name__)
auth = authorization.Authorization()
Spotify = spotify.Spotify()
OpenAI = openai.OpenAI_API()


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
    code = request.args.get("code")
    Spotify.set_auth(code)

    return "<script>window.close()</script>"


@app.route("/api/user")
def user():
    user = Spotify.get_user()
    response = jsonify(user)

    return response


@app.route("/api/top-tracks")
def top_tracks():
    tracks = Spotify.get_top_tracks(
        request.args.get("count"), request.args.get("timeframe")
    )

    return tracks


@app.route("/api/create-playlist/recommendations", methods=["POST"])
def create_rec_playlist():
    request_data = request.get_json()
    response = Spotify.create_rec_playlist(
        request_data["track_ids"], request_data["genres"]
    )

    return response


@app.route("/api/create-playlist/<timeframe>/<count>", methods=["POST"])
def make_playlist(timeframe, count):
    response = Spotify.create_playlist(timeframe, count)

    response = jsonify(response)
    return response


@app.route("/api/genres")
def get_genres():
    response = Spotify.get_genres()
    response = jsonify(response)

    return response


@app.route("/api/recommendations")
def get_recommendations():
    response = Spotify.get_rec_playlist(
        genres=request.args.get("recGenres"), limit=request.args.get("limit")
    )

    response = jsonify(response)
    return response


@app.route("/api/openai")
def get_ai_playlist():
    playlist = OpenAI.send_prompt(
        prompt=request.args.get("prompt"), limit=request.args.get("limit")
    )
    if (playlist):
        tracks = Spotify.search(playlist["tracks"])

        response = {
            "title": playlist["title"],
            "description": playlist["description"],
            "tracks": tracks,
        }

        return response
    else:
        return 'Internal Server Error', 500
    


@app.route("/api/create-playlist/openai", methods=["POST"])
def create_ai_playlist():
    request_data = request.get_json()
    response = Spotify.create_ai_playlist(
        request_data["title"], request_data["description"], request_data["track_ids"]
    )
    
    return response

@app.route("/api/user-tracks")
def user_tracks():
    tracks = Spotify.get_user_tracks()

    return tracks
