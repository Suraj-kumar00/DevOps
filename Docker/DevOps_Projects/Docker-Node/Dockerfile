# Choose the base image
FROM ubuntu:latest

# Update the package list and install curl
RUN apt-get update && apt-get install -y curl

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update && apt-get install -y nodejs

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that your application will run on
# EXPOSE 8080

# Command to run the application
ENTRYPOINT [ "node", "main.js" ]
