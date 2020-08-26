FROM node:alpine

WORKDIR /frontend
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

CMD ["yarn", "start"]
