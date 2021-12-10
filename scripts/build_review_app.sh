#!/bin/bash

# Description: Run this script to automate the process of building Hokusai
# review application for Force. It draws upon Artsy's existing review app
# documentation:
# https://github.com/artsy/hokusai/blob/master/docs/Review_Apps.md and
# experiences trying to set up review apps!

# USAGE: $ ./scripts/build_review_app.sh review-app-name

echo "[build_review_app.sh] START"

# Bail out of script on first expression failure and echo the commands as
# they are being run.
set -ev

NAME="$1"

if test -z "$NAME"; then
  echo "You didn't provide a shell argument, so NAME isn't meaningful, exiting."
  exit 1
fi

# Generate the Kubernetes YAML needed to provision the application.
hokusai review_app setup "$NAME"
review_app_file_path="hokusai/$NAME.yml"

# Create the Docker image of your current working direct of Force, and push
# it to Artsy's docker registry.
#
# --force is needed as the current working directory is dirty with (at least)
# the YAML file generated above.
# --skip-latest as we're making no claim that this is the "latest" build of the
# service.
# --tag to name the image.
# WARNING: This is likely going to take ~10 mins on your MBP.
# Be patient and grab some baby carrots.
hokusai registry push --force --skip-latest --overwrite --verbose --tag "$NAME"

# Edit the K8S YAML to reference the proper Docker image
sed -i.bak "s/:staging/:$NAME/g" "$review_app_file_path" && rm "$review_app_file_path.bak"

# Edit the K8S YAML Ingress resource to use the Review App's name as the host.
sed -i.bak "s/host: staging.artsy.net/host: $NAME.artsy.net/g" "$review_app_file_path" && rm "$review_app_file_path.bak"

# Provision the review app
hokusai review_app create "$NAME" --verbose

# Copy Force staging's ConfigMap to your review app
hokusai review_app env copy "$NAME" --verbose

# To enable authentication via Force's server, we need to allow XHR requests
# from Force's client to server. As such, Force's server needs to have the
# proper name of the domain that the requests are coming from. Otherwise,
# authentication requests won't work!
hokusai review_app env set "$NAME" \
  APP_URL="https://$NAME.artsy.net" \
  APPLICATION_NAME="$NAME" \
  COOKIE_DOMAIN="$NAME.artsy.net" \
  FORCE_URL="https://$NAME.artsy.net"

# Publish Force assets to S3
hokusai review_app run "$NAME" 'yarn publish-assets'

# Refresh ENV
hokusai review_app refresh "$NAME"

# Now you need to create a CNAME for your review app and wait. This is required
# as Gravity only allows authentication requests from requests of originating
# from the artsy.net domain
# Hey you human!
# ...
# ...
# ...
# ...
# ...
# ...
# ...
# ...
# ...
# yeah, I'm talking to you
# you need to configure a CNAME record so that $NAME.artsy.net points to nginx-staging.artsy.net
#
echo "Create a CNAME record of $NAME.artsy.net pointing to nginx-staging.artsy.net"
#
# you may do this in the Cloudflare interface. Credentials are in 1pass.
#
# Step-by-step instructions:
# https://github.com/artsy/force/blob/main/docs/creating_review_app.md#dns-setup
echo "[build_review_app.sh] SUCCESS"

exit 0
