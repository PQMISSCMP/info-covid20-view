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
FROM node:latest as node
ARG APP=fe-corona
ENV APP ${APP}
WORKDIR /app
RUN npm i -g @angular/cli
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
RUN apk add --update nodejs nodejs-npm
COPY --from=node /app/dist/${APP} /usr/share/nginx/html
COPY package* ./
CMD ["npm","run", "start:prod"]