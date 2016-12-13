FROM node:latest
RUN npm install npm@latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g gulp
RUN npm install -g bower
RUN npm install -g mean-cli

COPY . /usr/src/app/
RUN rm -rf /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

USER node
RUN touch /home/node/.mean
RUN npm install 
COPY ./node_modules/* /usr/src/app/node_modules/
ENV PORT 3000  
ENV DB_PORT_27017_TCP_ADDR db
CMD [ "gulp" ]
EXPOSE 3000
