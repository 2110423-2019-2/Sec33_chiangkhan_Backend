FROM asia.gcr.io/cu-openhouse-2020/backend/profile:latest

WORKDIR /cuoh_profile

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npm install -g nodemon

EXPOSE 3000

RUN yarn build

CMD "yarn" "start:prod"