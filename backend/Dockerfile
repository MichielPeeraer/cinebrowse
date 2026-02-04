# ./backend/Dockerfile
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
EXPOSE 5000

# Seed data and start container in dev mode using nodemon
CMD ["sh", "-c", "npm run seed && npm run dev"]
