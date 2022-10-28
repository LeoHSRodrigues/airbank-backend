FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

ARG PORT
ENV PORT ${PORT}

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]