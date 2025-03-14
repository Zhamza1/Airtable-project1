FROM node:22.12.0

WORKDIR /usr/app/portfolio

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","dev"]
