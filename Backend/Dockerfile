FROM node:16.17-alpine3.15
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENV PORT=8000
ENV MONGO_HOST=db
ENV MONGO_PORT=27017
EXPOSE $PORT
CMD ["yarn", "run", "dev"]
