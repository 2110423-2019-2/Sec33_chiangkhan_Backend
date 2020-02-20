FROM node:12

WORKDIR /home/node/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD "yarn" "start"