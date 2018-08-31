# The bitnami images are stripped down and offer things like install_packages
# that avoid crufting up the image with lots of dependencies. 
# 
FROM bitnami/node:8.11.3
#FROM circleci/node:8-stretch-browsers

RUN install_packages libsecret-1-dev libglib2.0-dev

#ADD . /home/circleci/project
ADD . /app
WORKDIR /app

RUN git rev-parse HEAD > COMMIT_HASH.txt && rm -rf .git

#WORKDIR /home/circleci/project
#RUN sudo chown -R circleci:circleci /home/circleci/project
RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn
RUN yarn install

CMD yarn start
