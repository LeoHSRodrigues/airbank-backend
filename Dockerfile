FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm run build

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]