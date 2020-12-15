FROM node:alpine

WORKDIR /frontend
COPY package.json .
# CI=true is needed to run CRA on skaffold. Otherwise it would just exit too early
ENV CI=true
COPY yarn.lock .
RUN yarn install
COPY . .

CMD ["yarn", "start"]
