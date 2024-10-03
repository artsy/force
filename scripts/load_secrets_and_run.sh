#!/bin/sh

CMD="$@"

if [ ! -z "$SECRETS_FILE" ]
then
  echo "SECRETS_FILE env var is defined. Sourcing secrets file..."
  source "$SECRETS_FILE"
fi

echo "Running command: $CMD"
$CMD
