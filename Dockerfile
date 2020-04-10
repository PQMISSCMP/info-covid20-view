
# FROM node:alpine

# RUN apk add --update \
#   git \
#   openssh-client

# WORKDIR /app

# COPY ./package.json ./

# RUN npm install --production

# COPY /dist/fe-corona /app

# CMD ["npm","start"]

### STAGE 1: Build ###
# FROM node:12.7-alpine AS build
# WORKDIR /usr/src/app/dist/fe-corona
# COPY package.json ./
# RUN npm install
# COPY dist/fe-corona .
# RUN npm run build

# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY --from=build /usr/src/app/dist/fe-corona /usr/share/nginx/html


FROM node:latest as node

ARG ENV=prod
ARG APP=fe-corona

ENV ENV ${ENV}
ENV APP ${APP}

WORKDIR /app
COPY ./ /app/

# Instala y construye el Angular App
RUN npm ci
RUN npm run build --prod
RUN mv /app/dist/${APP}/* /app/dist/

# RUN mv /app/dist/${APP}/* /app/dist/

# Angular app construida, la vamos a hostear un server production, este es Nginx

FROM nginx:1.13.8-alpine
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
