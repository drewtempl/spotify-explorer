import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotipy import MemoryCacheHandler
import os
from dotenv import load_dotenv


load_dotenv()

# print(os.environ['CLIENT_ID'],
#       os.environ['CLIENT_SECRET'],
#       os.environ['REDIRECT_URI'],)


class Authorization:
    def __init__(self):
        load_dotenv()
        scope = "user-read-email playlist-modify-public user-library-read user-library-modify user-top-read"
        self.auth_manager = SpotifyOAuth(scope=scope, client_id=os.environ['CLIENT_ID'],
                                         client_secret=os.environ['CLIENT_SECRET'],
                                         redirect_uri=os.environ['REDIRECT_URI'],
                                         #  proxies={'http': 'http://localhost:8000'},
                                         open_browser=False,
                                         cache_handler=MemoryCacheHandler())


    def get_url(self):
        return self.auth_manager.get_authorize_url()
    
    def get_auth(self):
        return spotipy.Spotify(self.auth_manager)
