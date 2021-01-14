FROM node:14-alpine
ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Copy the bot itself
COPY . /usr/src/app

# Start the bot
CMD ["node", "index.js"]