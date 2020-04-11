# ### STAGE 1: Build ###
# FROM node:12.7-alpine AS build
# ARG APP=fe-corona
# ENV APP ${APP}
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# RUN apk add --update nodejs nodejs-npm
# WORKDIR /app
# COPY --from=build /usr/src/app/dist/${APP} .
# CMD ["npm","run", "start:prod"]



# stage 1
FROM node:10.13-alpine as node
ARG APP=fe-corona
ENV APP ${APP}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# docker pull node:12.16.2-alpine

# stage 2 
FROM nginx:1.17.9-alpine
RUN apk add nodejs nodejs-npm
RUN ng update @angular/cli --migrate-only --from=1.7.3
# COPY --from=node /app/dist/${APP} /usr/share/nginx/html
COPY --from=node /usr/src/app/dist/${APP} /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# RUN npm i -g @angular/cli
# COPY package* ./
CMD ["npm","run", "start:prod"]