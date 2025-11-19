FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Install build dependencies for SWC and sharp
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libc6 \
    libc6-dev \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build Strapi admin panel
RUN npm run build

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
