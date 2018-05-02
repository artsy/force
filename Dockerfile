FROM bitnami/node:8
#FROM circleci/node:8-stretch-browsers

#install_packages procps git openssh

#ADD . /home/circleci/project
ADD . /app
WORKDIR /app

#WORKDIR /home/circleci/project
#RUN sudo chown -R circleci:circleci /home/circleci/project
RUN npm install -g yarn@1.5.1
RUN yarn install

CMD yarn start
