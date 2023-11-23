from . import authorization
from . import constants


class Spotify:
    def __init__(self):
        self.auth = authorization.Authorization()
        self.sp = self.auth.get_spotify()

        self.tracklist = [
            {"year": 2019, "song_title": "Lost in Japan", "artist": "Shawn Mendes"},
            {
                "year": 2016,
                "song_title": "Say You Won't Let Go",
                "artist": "James Arthur",
            },
            {"year": 2015, "song_title": "Thinking Out Loud", "artist": "Ed Sheeran"},
            {"year": 2020, "song_title": "Blind", "artist": "Lola Young"},
            {"year": 2018, "song_title": "In My Blood", "artist": "Shawn Mendes"},
            {"year": 2014, "song_title": "All of Me", "artist": "John Legend"},
            {"year": 2021, "song_title": "Drivers License", "artist": "Olivia Rodrigo"},
            {"year": 2017, "song_title": "Perfect", "artist": "Ed Sheeran"},
            {"year": 2013, "song_title": "Stay", "artist": "Rihanna"},
            {"year": 2020, "song_title": "Before You Go", "artist": "Lewis Capaldi"},
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
        self.sp.playlist_add_items(playlist["id"], track_ids)

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

    def create_rec_playlist(self, track_ids, genres):
        desc = ", ".join(genres)

        playlist = self.sp.user_playlist_create(
            user=self.user["id"], name="Genre Recommendations", description=desc
        )
        self.sp.playlist_add_items(playlist["id"], track_ids)

        return playlist["external_urls"]["spotify"]
    
    def create_ai_playlist(self, title, description, track_ids):
        playlist = self.sp.user_playlist_create(
            user=self.user["id"], name=title, description=description
        )
        self.sp.playlist_add_items(playlist["id"], track_ids)

        return playlist["external_urls"]["spotify"]

    def search(self, tracks):
        tracklist = []
        for track in tracks:
            query = "artist:" + track["artist"] + " track:" + track["song_title"]
            res = self.sp.search(q=query, limit=1)["tracks"]["items"]

            if res:
                tracklist.append(res[0])

        return tracklist
