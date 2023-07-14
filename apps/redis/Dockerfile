FROM node

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm \
    && pnpm install

COPY . . 

EXPOSE 8081

CMD pnpm start