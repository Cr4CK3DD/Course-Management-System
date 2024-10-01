FROM node:latest

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x script.sh

CMD ["sh", "script.sh"]