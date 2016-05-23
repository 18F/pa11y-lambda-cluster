FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y \
  git \
  git-core \
  curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y nodejs
WORKDIR /app
COPY app/ .
