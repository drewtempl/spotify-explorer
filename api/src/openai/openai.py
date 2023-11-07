import os
import openai
from dotenv import load_dotenv
import json


class OpenAI:
    def __init__(self):
        load_dotenv()
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def send_prompt(self, prompt, limit):
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[
                {'role': 'system', 'content': f"You generate playlists with {limit} tracks"},
                {'role': 'user', 'content': prompt}],
            functions=[{
                'name': 'parse_playlist',
                'description': 'Playlist generator',
                'parameters': {
                    "type": "object",
                    "properties": {
                        'title': {
                            'type': 'string',
                            'description': 'Title of the playlist'
                        },
                        'description': {
                            'type': 'string',
                            'description': 'Description of the playlist',
                        },
                        'tracks': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'index': {
                                        'type': 'number',
                                        'description': 'Track number',
                                    },
                                    'song_title': {
                                        'type': 'string',
                                        'description': 'Title of the song',
                                    },
                                    'artist': {
                                        'type': 'string',
                                        'description': 'Name of the artist',
                                    }
                                },
                                'required': ['index', 'song_title', 'artist']

                            }

                        }

                    },
                    'required': ['title', 'description', 'tracks']
                }
            }]
        )

        return json.loads(response.choices[0].message.function_call.arguments)
