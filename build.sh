#!/bin/bash
cd client

# build and push client image
docker build --platform linux/amd64 -f Dockerfile -t  explorer-client .
aws lightsail push-container-image --region us-east-2 --service-name container-service-1 \
    --label explorer-client --image explorer-client:latest

cd ../api

# build and push api image
docker build --platform linux/amd64 -f Dockerfile -t  explorer-api .
aws lightsail push-container-image --region us-east-2 --service-name container-service-1 \
    --label explorer-api --image explorer-api:latest
