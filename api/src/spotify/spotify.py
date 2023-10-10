from . import authorization
from . import constants


class Spotify:
    def __init__(self):
        self.auth = authorization.Authorization()
        self.sp = self.auth.get_spotify()

    def get_user(self):
        self.user = self.sp.me()
        return self.user

    def get_top_tracks(self, limit, time_range):
        self.top_tracks_playlist = self.sp.current_user_top_tracks(
            limit=limit, offset=0, time_range=time_range)

        return self.top_tracks_playlist

    def create_playlist(self, timeframe, count):
        titles = {
            'short_term': 'the last 4 weeks',
            'medium_term': 'the last 6 months',
            'long_term': 'all time',
        }

        title = f'Top songs of {titles[timeframe]}'
        playlist = self.sp.user_playlist_create(self.user['id'], title)

        track_ids = self.get_track_ids(self.top_tracks_playlist['items'])
        self.sp.playlist_add_items(playlist['id'], track_ids, position=None)

        return playlist['external_urls']['spotify']

    def get_track_ids(self, tracklist):
        ids = []
        for track in tracklist:
            ids.append(track['id'])

        return ids

    def get_auth_url(self):
        return self.auth.get_url()

    def set_auth(self, code):
        token = self.auth.get_access_token(code)

        print(token)

        self.sp.set_auth(token)

    def get_genres(self):
        return constants.GENRES
        return self.sp.recommendation_genre_seeds()

    def get_rec_playlist(self, genres, limit):
        title = 'Recommendation Playlist'

        # print(genres)
        # return []

        tracks = self.sp.recommendations(seed_genres=genres, limit=limit)['tracks']
        track_ids = self.get_track_ids(tracks)

        playlist = self.sp.user_playlist_create(self.user['id'], title)
        self.sp.playlist_add_items(playlist['id'], tracks_ids=track_ids, position=None)

        return playlist['external_urls']['spotify']
