# !/usr/bin/bash

set -e -x

yarn assets
# Update filenames of generated CSS to be fingerprinted with matching JS fingerprint
for file in public/assets/*.js
do
  if [[ $file =~ (.*)\.(.*)\. ]]; then
    if [ -f "${BASH_REMATCH[1]}.css" ]; then
      mv "${BASH_REMATCH[1]}.css" "${BASH_REMATCH[1]}.${BASH_REMATCH[2]}.css"
    fi
  fi
done

# gzip -S .cgz $(find public/assets -name '*.css')
# gzip -S .jgz $(find public/assets -name '*.js')
