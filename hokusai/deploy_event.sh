#!/bin/sh
# ./deploy_event app env
# eg:
# ./deploy_event force production
# Must have DD_API_KEY set to datadog api key.

[ -z "$DD_API_KEY" ] && echo "Need to set DD_API_KEY" && exit 1;

curl -X POST -H "Content-type: application/json" \
-d "{
      \"title\": \"$1 was deployed to $2\",
      \"text\": \"version: $CIRCLE_SHA1\",
      \"priority\": \"normal\",
      \"tags\": [\"service:$1\", \"env:$2\"],
      \"alert_type\": \"info\"
}" \
"https://api.datadoghq.com/api/v1/events?api_key=$DD_API_KEY"
