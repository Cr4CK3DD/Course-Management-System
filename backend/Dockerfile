FROM node:latest

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x script.sh

CMD ["sh", "script.sh"]