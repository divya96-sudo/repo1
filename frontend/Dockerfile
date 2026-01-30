# FROM node:25-alpine3.21

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build 
# EXPOSE 3000
# CMD [ "npm", "start" ]




FROM node:25-alpine3.21 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest


RUN rm /etc/nginx/conf.d/default.conf


COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]