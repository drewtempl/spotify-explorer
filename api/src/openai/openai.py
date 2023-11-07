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
                            'description': 'playlist title'
                        },
                        'description': {
                            'type': 'string',
                            'description': 'playlist description',
                        },
                        'tracks': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'song_title': {
                                        'type': 'string',
                                        'description': 'song title',
                                    },
                                    'artist': {
                                        'type': 'string',
                                        'description': 'artist name without features',
                                    }
                                },
                                'required': ['song_title', 'artist']

                            }

                        }

                    },
                    'required': ['title', 'description', 'tracks']
                }
            }]
        )

        return json.loads(response.choices[0].message.function_call.arguments)
