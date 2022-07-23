FROM node:16-slim AS WEB_BUILD
WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
RUN npm run build


FROM nginx:1.13-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=WEB_BUILD build/* .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]