# spotify-explorer


## Run using Docker

```bash
docker-compose up --build
```
http://localhost:3000


## Run locally

### In `/api`

Create an environment
```bash
python3 -m venv .venv
```

Activate the environment
```bash
. .venv/bin/activate
```

Install dependencies
```bash
pip install -r requirements.txt
```

Run flask server
```bash
flask run
```

Run in debug mode
```bash
flask run --debug
```

### In `/client`

Install dependencies
```bash
npm install
```

Run client server
```bash
npm start
```