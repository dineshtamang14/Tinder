FROM node:16-alpine
LABEL "name"="node-api"
WORKDIR /usr/src/app
COPY ./package.json ./
COPY . .
EXPOSE 8000
CMD ["server.js"]
