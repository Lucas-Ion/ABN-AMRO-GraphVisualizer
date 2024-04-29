# Start from the official Node.js 20.12.2 image
FROM node:20.12.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and potentially package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your frontend's source code
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
