# Use a base Node.js image
FROM node:18 AS app

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the internal Express port
EXPOSE 8080

# Start the Express server
CMD ["npm", "start"]
