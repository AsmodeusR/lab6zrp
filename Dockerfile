FROM lbosqmsft/mssql-nodejs-tedious:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
