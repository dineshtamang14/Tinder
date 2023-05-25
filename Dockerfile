FROM node:16.17-alpine3.15 AS BUILDER
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
ARG API_URL=tinder-api
ENV REACT_APP_API_URL=$API_URL
RUN yarn run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
ARG API_URL=tinder-api
ENV REACT_APP_API_URL=$API_URL
COPY --from=BUILDER /usr/src/app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]