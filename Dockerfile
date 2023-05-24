FROM node:16.17-alpine3.15 AS BUILDER
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
RUN yarn run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=BUILDER /usr/src/app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]