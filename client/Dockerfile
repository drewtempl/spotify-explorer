# Use an official Node.js runtime as a parent image
FROM node:16-alpine as build-step

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
FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
