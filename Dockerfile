# Stage 1: Build the application
FROM node:alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application (output goes to the 'build' folder)
RUN npm run build

# Stage 2: Serve the built application with a lightweight web server
FROM nginx:alpine AS production

# Copy the build output from the previous stage to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
