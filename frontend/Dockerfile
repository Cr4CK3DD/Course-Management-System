FROM node:latest

WORKDIR /frontend

COPY . .

RUN npm install

CMD ["npm", "run", "dev" ,"--", "--host"]