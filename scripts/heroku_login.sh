cat >~/.netrc <<EOF
machine api.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_TOKEN
machine git.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_TOKEN
EOF
chmod 600 ~/.netrc
"[[ ! -s \"$(git rev-parse --git-dir)/shallow\" ]] || git fetch --unshallow"
