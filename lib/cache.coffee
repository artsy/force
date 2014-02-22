#
# Way to easily get or set things using redis
app = require 'express'
{ DEFAULT_CACHE_TIME, NODE_ENV, REDIS_URL } = require "../config"
redis = require("redis")

client = undefined

# Redis Client
if REDIS_URL
  if NODE_ENV == 'development'
    client = redis.createClient();
  else if NODE_ENV != 'test'
    red = parse(REDIS_URL || '');
    client = redis.createClient(red.port, red.hostname);
    client.auth(red.auth.split(':')[1]);

module.exports.cacheGet = (key, found, notFound) ->
  return notFound() unless client
  client.get(key, (err, cachedJSON) ->
    if cachedJSON
      found cachedJSON
    else
      notFound()
  )

module.exports.cacheSet = (key, data, done, cacheTime=DEFAULT_CACHE_TIME) ->
  return done(data) unless client
  client.set key, data
  client.expire key, DEFAULT_CACHE_TIME
  done data
