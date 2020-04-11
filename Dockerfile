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
FROM node:lastest as node
ARG APP=fe-corona
ENV APP ${APP}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2 
FROM nginx:1.17.9-alpine
# RUN sudo apt-get add --update nodejs nodejs-npm
# COPY --from=node /app/dist/${APP} /usr/share/nginx/html
COPY --from=node /usr/src/app/dist/angular-docker /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# RUN npm i -g @angular/cli
# COPY package* ./
CMD ["npm","run", "start:prod"]