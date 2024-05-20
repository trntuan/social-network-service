# Use Node.js base image
FROM node:20-alpine

# Set the working directory for the app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code into the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on within the container
EXPOSE 3000

# Command to run the application when the container starts
CMD ["npm", "run", "start:prod"]
