FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

USER node

EXPOSE 8000

CMD [ "npm", "run", "start" ]