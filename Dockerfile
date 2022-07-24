FROM node:16-slim AS WEB_BUILD
WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=WEB_BUILD /usr/src/app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
