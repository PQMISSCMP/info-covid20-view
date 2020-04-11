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
RUN apk add npm
WORKDIR /app
COPY --from=build /usr/src/app/dist/${APP} .
CMD ["npm","run", "start:prod"]
