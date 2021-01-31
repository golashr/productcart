FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/productcart
COPY package.json ./

RUN npm install
RUN npm install pm2 -g

COPY ./dist ./dist

CMD ["pm2-runtime", "dist/server.js", "-i", "0"]