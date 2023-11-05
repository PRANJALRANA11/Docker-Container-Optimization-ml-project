# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the React app (adjust this command as needed)
RUN npm run build

# Expose the port where the React app will run (if needed)
EXPOSE 3000

# Command to start the React app (you can customize this as needed)
CMD ["npm", "start"]
