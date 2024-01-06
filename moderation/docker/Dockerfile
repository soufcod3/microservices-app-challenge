FROM node:18

RUN apt-get update \
    && apt-get install -y sudo \
    && apt-get install -y mycli \
    && apt-get install -y less \
    && apt-get install -y tzdata \
    && npm install -g typescript \
    && npm install -g ts-node

ENV TZ Europe/Paris

ENV SHELL /bin/bash

WORKDIR /home/moderation

RUN /bin/bash