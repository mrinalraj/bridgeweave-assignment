FROM node:16

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .

CMD npx prisma migrate deploy && npx prisma generate && npm start 