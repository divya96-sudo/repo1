FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install --production

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]


# FROM nginx:alpine

# COPY index.html /usr/share/nginx/html/index.html

# EXPOSE 80
