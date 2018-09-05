# The bitnami images are stripped down and offer things like install_packages
# that avoid crufting up the image with lots of dependencies. 
# 
FROM bitnami/node:8.11.3
ARG commit_hash
RUN install_packages libsecret-1-dev libglib2.0-dev

#ADD . /home/circleci/project
ADD . /app
WORKDIR /app

RUN echo ${commit_hash} > COMMIT_HASH.txt

RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn
RUN yarn install

CMD yarn start
