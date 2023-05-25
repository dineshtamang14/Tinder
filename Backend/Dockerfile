FROM node:16.17-alpine3.15
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
ENV PORT=8000
ENV MONGOURL=db
EXPOSE $PORT
ENTRYPOINT ["yarn", "run"]
CMD ["dev"]