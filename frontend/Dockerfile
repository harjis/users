FROM node:alpine

WORKDIR /frontend
COPY package.json .
COPY yarn.lock .
COPY .env .
RUN yarn install
COPY . .

CMD ["yarn", "start"]
