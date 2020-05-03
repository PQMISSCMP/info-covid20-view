# stage 1
FROM node:latest as node
ARG APP=corona
ENV APP ${APP}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod


# stage 2 
FROM nginx
COPY --from=node /usr/src/app/dist/${APP} /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'


