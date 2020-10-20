#!/usr/bin/env bash

curl https://raw.githubusercontent.com/artsy/metaphysics/master/_schemaV2.graphql -o data/schema.graphql
yarn prettier --write --parser graphql data/schema.graphql
