from . import authorization
from . import constants


class Spotify:

    def __init__(self):
        self.auth = authorization.Authorization()
        self.sp = self.auth.get_spotify()

        self.tracklist = [
            {"index": 1, "song_title": "In Da Club", "artist": "50 Cent"},
            {"index": 2, "song_title": "Hot in Herre", "artist": "Nelly"},
            {"index": 3, "song_title": "Get Ur Freak On", "artist": "Missy Elliott"},
            {"index": 4, "song_title": "Crazy in Love", "artist": "Beyoncé ft. Jay-Z"},
            {"index": 5, "song_title": "Lose Yourself", "artist": "Eminem"},
            {"index": 6, "song_title": "The Way I Am", "artist": "Eminem"},
            {
                "index": 7,
                "song_title": "Hate It or Love It",
                "artist": "The Game ft. 50 Cent",
            },
            {
                "index": 8,
                "song_title": "Still D.R.E.",
                "artist": "Dr. Dre ft. Snoop Dogg",
            },
            {
                "index": 9,
                "song_title": "In Da Wind",
                "artist": "Trick Daddy ft. CeeLo Green and Big Boi",
            },
            {
                "index": 10,
                "song_title": "The Next Episode",
                "artist": "Dr. Dre ft. Snoop Dogg",
            },
        ]

    def get_user(self):
        self.user = self.sp.me()
        return self.user

    def get_top_tracks(self, limit, time_range):
        if limit == "99":
            results = self.sp.current_user_top_tracks(
                limit=49, offset=0, time_range=time_range
            )

            tracks = results["items"]

            results = self.sp.current_user_top_tracks(
                limit=50, offset=49, time_range=time_range
            )

            tracks.extend(results["items"])

        else:
            tracks = self.sp.current_user_top_tracks(
                limit=limit, offset=0, time_range=time_range
            )["items"]

        self.top_tracks_playlist = tracks
        # print(tracks)
        return self.top_tracks_playlist

    def create_playlist(self, timeframe, count):
        titles = {
            "short_term": "the last 4 weeks",
            "medium_term": "the last 6 months",
            "long_term": "all time",
        }

        title = f"Top songs of {titles[timeframe]}"
        playlist = self.sp.user_playlist_create(self.user["id"], title)

        track_ids = self.get_track_ids(self.top_tracks_playlist)
        self.sp.playlist_add_items(playlist["id"], track_ids, position=None)

        return playlist["external_urls"]["spotify"]

    def get_track_ids(self, tracklist):
        ids = []
        for track in tracklist:
            ids.append(track["id"])

        return ids

    def get_auth_url(self):
        return self.auth.get_url()

    def set_auth(self, code):
        token = self.auth.get_access_token(code)

        print(token)

        self.sp.set_auth(token)

    def get_genres(self):
        return self.sp.recommendation_genre_seeds()

    def get_rec_playlist(self, genres, limit):
        genres = genres.split(",")

        tracks = self.sp.recommendations(seed_genres=genres, limit=limit)["tracks"]

        return tracks

    def search(self, tracks):
        tracklist = []
        # for track in tracks:
        for track in self.tracklist:
            title = track["song_title"].replace(" ", "%20")
            artist = track["artist"].replace(" ", "%20")

            query = f"track%3A{title}%20artist%3A{artist}"
            res = self.sp.search(q=query, limit=1)['tracks']['items'][0]

            tracklist.append(res)
            
        return tracklist
    
