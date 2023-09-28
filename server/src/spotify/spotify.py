from . import authorization


class Spotify:
    def __init__(self):
        self.sp = authorization.get_authorization()

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

