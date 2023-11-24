import os
from openai import OpenAI
from dotenv import load_dotenv
import json


class OpenAI_API:
    def __init__(self):
        load_dotenv()
        self.client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY"),
        )
        # openai.api_key = os.getenv("OPENAI_API_KEY")

    def send_prompt(self, prompt, limit):
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {
                    "role": "system",
                    "content": f"You generate playlists with {limit} tracks",
                },
                {"role": "user", "content": prompt},
            ],
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "parse_playlist",
                        "description": "Curate songs for a given prompt",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "description": "playlist title",
                                },
                                "description": {
                                    "type": "string",
                                    "description": "playlist description",
                                },
                                "tracks": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "song_title": {
                                                "type": "string",
                                                "description": "song title",
                                            },
                                            "artist": {
                                                "type": "string",
                                                "description": "artist name",
                                            },
                                        },
                                        "required": ["song_title", "artist"],
                                    },
                                },
                            },
                            "required": ["title", "description", "tracks"],
                        },
                    },
                }
            ],
        )

        try: 
            res = json.loads(response.choices[0].message.tool_calls[0].function.arguments)
        except:
            return None
        else:
            return res
