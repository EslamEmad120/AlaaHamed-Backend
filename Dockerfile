# Use Node.js LTS
FROM node:18

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Build Strapi
RUN npm run build

# Expose the default Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
