# ./frontend/Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port for app
EXPOSE 3000

# Next.js dev mode
CMD ["npm", "run", "dev"]