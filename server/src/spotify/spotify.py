from . import authorization

class Spotify:
    def __init__(self):
        self.sp = authorization.get_authorization()

    def get_user(self):
        return self.sp.me()
