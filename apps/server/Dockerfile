FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm \
    && pnpm install

COPY . . 

EXPOSE 8080

CMD pnpm dev
