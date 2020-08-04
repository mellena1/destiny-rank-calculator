FROM node:14.5.0 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm build


FROM nginx:1.19.1-alpine

COPY --from=builder /app/build /usr/share/nginx/html
