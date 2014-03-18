#
# A library of common cache helpers. If you need to do something more complex than
# the naive query caching Backbone Cache Sync (https://github.com/artsy/backbone-cache-sync)
# provides then it's recommended to wrap it up in a function in this lib.
#

_ = require 'underscore'
{ NODE_ENV, DEFAULT_CACHE_TIME, REDIS_URL, DEFAULT_CACHE_TIME } = require '../config'
redis = require 'redis'
client = null

# Setup redis client
if NODE_ENV isnt "test" and REDIS_URL
  red = require("url").parse(REDIS_URL)
  client = redis.createClient(red.port, red.hostname)
  client.auth(red.auth.split(":")[1]) if red.auth

# Export the redis client
@client = client

# Iterates through a hash and calls JSON.stringify on each value. This is useful
# when storing a big hash of models/collections to be deserialized later (e.g. on the fair page).
#
# @param {String} key Redis key
# @param {Object} hash

@setHash = (key, hash) ->
  return unless client?
  serialized = {}
  serialized[k] = JSON.stringify(v) for k, v of hash
  client.set key, JSON.stringify hash
  client.expire key, DEFAULT_CACHE_TIME

# Retrieves a serialized hash from `setHash` and deserializes it into models and
# collections. Pass in a hash of key: Model/Colllection class pairs to indicate what each
# key gets deserialized into.
#
# e.g.
#
# cache.getHash 'fair:' + id, {
#   fair: require('../../models/fair')
#   artworks: require('../../collections/artworks')
# }, ->
#
# @param {String} key Redis key to GET
# @param {Object} hash key: Model/Collection pairs
# @param {Function} callack Calls back with (err, deserializedHash)

@getHash = (key, hash, callback) ->
  return callback() unless client?
  client.get key, (err, json) ->
    return callback(err) if err
    if json
      data = JSON.parse json
      deserialized = {}
      console.log data.primarySets
      for key, json of data
        klass = hash[key]
        deserialized[key] = if klass? then new klass(json) else json
      callback null, deserialized
    else
      callback()