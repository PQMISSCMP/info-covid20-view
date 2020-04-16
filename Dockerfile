### STAGE 1: Build ###
FROM node:12.7-alpine AS build
ARG APP=fe-corona
ENV APP ${APP}
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
RUN apk add --update nodejs nodejs-npm
WORKDIR /app
COPY --from=build /usr/src/app/dist/${APP} .



# # stage 1
# FROM node:10.16.3-alpine as node
# ARG APP=fe-corona
# ENV APP ${APP}
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # docker pull node:12.16.2-alpine

# # stage 2 
# FROM nginx
# RUN apk add nodejs npm nodejs-npm
# # COPY --from=node /app/dist/${APP} /usr/share/nginx/html
# COPY --from=node /usr/src/app/dist/${APP} /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# # RUN npm i -g @angular/cli
# # COPY package* ./
# CMD ["npm","run", "start:prod"]



# FROM node:8.9.1-alpine as node
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2
# FROM nginx:1.13.12-alpine
# COPY --from=node /usr/src/app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

# stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install -g @angular/cli@latest
# RUN npm install
# RUN npm run build --prod

# # stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/fe-corona /usr/share/nginx/html

# FROM node:alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm install && \
#     npm run build

# FROM nginx:alpine
# COPY --from=builder /app/dist/* /usr/share/nginx/html/


# # Nodejs Base image
# FROM node
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# # install and app dependencies
# COPY package.json /app/package.json
# RUN npm install
# RUN npm install -g @angular/cli
# # add app
# COPY . /app
