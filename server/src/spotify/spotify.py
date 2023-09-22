from . import authorization


class Spotify:
    def __init__(self):
        print('Init!')
        self.sp = authorization.get_authorization()

    def get_user(self):
        return self.sp.me()

    def get_top_tracks(self, limit, time_range):
        return self.sp.current_user_top_tracks(
            limit=limit, offset=0, time_range=time_range)
