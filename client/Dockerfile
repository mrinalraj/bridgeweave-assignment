from node:16

WORKDIR /client
COPY package.json .
RUN npm install
RUN npm install -g serve
COPY . .
CMD npm run build && serve -s build -l 3000
