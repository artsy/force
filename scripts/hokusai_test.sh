# !/usr/bin/bash

set -e -x

# install java 8
install_packages libnss3 libgconf-2-4 xvfb xauth openjdk-8-jre openjdk-8-jre-headless openjdk-8-jdk openjdk-8-jdk-headless ca-certificates-java

## install phantomjs
#
PHANTOMJS_URL="https://circle-downloads.s3.amazonaws.com/circleci-images/cache/linux-amd64/phantomjs-latest.tar.bz2" \
  && apt-get install libfontconfig \
  && curl --silent --show-error --location --fail --retry 3 --output /tmp/phantomjs.tar.bz2 ${PHANTOMJS_URL} \
  && tar -x -C /tmp -f /tmp/phantomjs.tar.bz2 \
  && mv /tmp/phantomjs-*-linux-x86_64/bin/phantomjs /usr/local/bin \
  && rm -rf /tmp/phantomjs.tar.bz2 /tmp/phantomjs-* \
  && phantomjs --version

# install firefox

# If you are upgrading to any version newer than 47.0.1, you must check the compatibility with
# selenium. See https://github.com/SeleniumHQ/selenium/issues/2559#issuecomment-237079591
install_packages libgtk3.0-cil-dev libasound2 libasound2 libdbus-glib-1-2 libdbus-1-3

FIREFOX_URL="https://s3.amazonaws.com/circle-downloads/firefox-mozilla-build_47.0.1-0ubuntu1_amd64.deb" \
  && curl --silent --show-error --location --fail --retry 3 --output /tmp/firefox.deb $FIREFOX_URL \
  && echo 'ef016febe5ec4eaf7d455a34579834bcde7703cb0818c80044f4d148df8473bb  /tmp/firefox.deb' | sha256sum -c \
  && dpkg -i /tmp/firefox.deb \
  && rm -rf /tmp/firefox.deb \
  && firefox --version

# install chrome
# Note: Revert back to https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# after browser testing works in google-chrome-stable 65.0.x.y
curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && install_packages libnss3 libgconf-2-4 google-chrome-stable \
  && sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' "/opt/google/chrome/google-chrome" \
  && google-chrome --version

export CHROMEDRIVER_RELEASE=$(curl --location --fail --retry 3 http://chromedriver.storage.googleapis.com/LATEST_RELEASE) \
      && curl --silent --show-error --location --fail --retry 3 --output /tmp/chromedriver_linux64.zip "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_RELEASE/chromedriver_linux64.zip" \
      && cd /tmp \
      && unzip chromedriver_linux64.zip \
      && rm -rf chromedriver_linux64.zip \
      && mv chromedriver /usr/local/bin/chromedriver \
      && chmod +x /usr/local/bin/chromedriver \
      && chromedriver --version

cd /app

export DISPLAY=:99
Xvfb :99 -screen 0 1280x1024x24 &
exec bash scripts/test.sh