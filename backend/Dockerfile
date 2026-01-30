FROM node:25-alpine3.21

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD [ "npm", "run","start" ]
