FROM node:16.17-alpine3.15
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
ENV MONGOURL=db
ENV PORT=8000
EXPOSE $PORT
ENTRYPOINT ["yarn", "run"]
CMD ["dev"]