FROM node:16-alpine

LABEL MAINTAINER="Niskii <psychoniskii2@gmail.com>"

WORKDIR /app
COPY . .
RUN yarn
RUN yarn lint
RUN yarn cache clean

CMD [ "yarn", "dev" ]