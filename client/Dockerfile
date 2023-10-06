# Use an official Node.js runtime as a parent image
FROM node:16-alpine as base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json /app
COPY package-lock.json /app

# Install dependencies
RUN npm install

# Copy all source files to the working directory
COPY . /app

# Build the React app
RUN npm run build

# Stage 2 - Serve the build files with a smaller Nginx image
FROM nginx:stable-alpine as stage1
COPY --from=base /app/build /usr/share/nginx/html
COPY deployment/nginx.dev.conf /etc/nginx/conf.d/default.conf

FROM stage1 as stage2
COPY deployment/nginx.prod.conf /etc/nginx/conf.d/default.conf
