FROM node:18.17.0

WORKDIR /usr/src/app/back

COPY /package*.json ./

RUN npm install
RUN npm install mysql2

COPY ./ .

RUN npm install -g nodemon

EXPOSE 8800

CMD ["npm", "start"]