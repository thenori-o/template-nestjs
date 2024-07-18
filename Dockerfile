FROM node:21-slim

RUN apt update && apt install -y --no-install-recommends \
  git \
  ca-certificates \
  default-jre \
  procps

RUN npm install -g @nestjs/cli@10.3.2

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]