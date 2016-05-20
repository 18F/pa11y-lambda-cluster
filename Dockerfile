FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y nodejs-legacy npm git git-core
WORKDIR /app
COPY app/ .
