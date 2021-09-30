#!/bin/bash

set -e

RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
NO_COLOR=$(tput sgr0)

HELP="${RED}command not found: detect-secrets${NO_COLOR}

To install the command line tool re-run: ${GREEN}https://github.com/artsy/potential/blob/main/scripts/setup${NO_COLOR}
To learn more about this tool: ${GREEN}https://www.notion.so/artsy/Detect-Secrets-cd11d994dabf45f6a3c18e07acb5431c${NO_COLOR}

You can bypass this hook using --no-verify option. ${RED}USE AT YOUR OWN RISK!${NO_COLOR}"

echo 'Executing detect-secrets...'
if which detect-secrets > /dev/null; test $? != 0; then
  echo "${HELP}"
  exit 1
else
  detect-secrets-hook --baseline .secrets.baseline $(git diff --staged --name-only)
fi
echo "${GREEN}No secrets detected!${NO_COLOR}"
