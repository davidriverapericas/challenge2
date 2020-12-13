FROM node:10-slim
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g nodemon
COPY . /app
CMD ["npm", "start"]