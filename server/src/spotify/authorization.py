import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotipy import MemoryCacheHandler
import os


def get_authorization():
    scope = "user-read-email playlist-modify-public user-library-read user-library-modify user-top-read"
    return spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope,
                                                     client_id=os.environ['SPOTIPY_CLIENT_ID'],
                                                     client_secret=os.environ['SPOTIPY_CLIENT_SECRET'],
                                                     redirect_uri=os.environ['SPOTIPY_REDIRECT_URI'],
                                                     cache_handler=MemoryCacheHandler()))
