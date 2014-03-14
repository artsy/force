#
# A library of common cache helpers. If you need to do something more complex than
# the naive query caching Backbone Cache Sync (https://github.com/artsy/backbone-cache-sync)
# provides then it's recommended to wrap it up in a function in this lib.
#

_ = require 'underscore'
{ NODE_ENV, DEFAULT_CACHE_TIME, REDIS_URL } = require '../config'
redis = require 'redis'
client = null

# Setup redis client
if NODE_ENV is "development"
  client = redis.createClient()
else if NODE_ENV isnt "test"
  red = require("url").parse(REDIS_URL or "")
  client = redis.createClient(red.port, red.hostname)
  client.auth red.auth.split(":")[1]

# Alias client methods
@client = client

# Iterates through a hash and calls JSON.stringify on each value. This is useful
# when storing a big hash of models/collections to be deserialized later (e.g. on the fair page).
#
# @param {String} key Redis key
# @param {Object} hash

@setHashToJSON = (key, hash) ->
  serialized = {}
  serialized[k] = JSON.stringify(v) for k, v of hash
  console.log 'setting', key, _.keys(hash).length
  client.set key, JSON.stringify hash