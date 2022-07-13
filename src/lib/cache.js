/**
 * This also providers a safe wrapper around redis calls so the app can function
 * without redis when necessary.
 */

const once = require("lodash/once")
const { NODE_ENV, OPENREDIS_URL, DEFAULT_CACHE_TIME } = process.env

class Cache {
  client = null

  // Setup redis client
  setup = callback => {
    if (NODE_ENV === "test" || !OPENREDIS_URL) {
      return callback()
    }
    if (OPENREDIS_URL) {
      const redis = require("redis")
      this.client = redis.createClient(OPENREDIS_URL)
    } else {
      this.client = null
    }
    this.client.on(
      "error",
      once(err => {
        console.warn("REDIS_CONNECTION_ERROR", err)
        this.client = null
        return callback()
      })
    )
    return this.client.on("ready", once(callback))
  }

  // Convenience for setting a value in the cache with an expiry.
  //
  // @param {String} key
  // @param {String} val
  // @param {Number} expiresIn Defaults to 30 mins
  set = (key, val, expiresIn) => {
    if (expiresIn == null) {
      expiresIn = 1800
    }
    if (this.client == null) {
      return
    }
    this.client.set(key, val)
    return this.client.expire(key, expiresIn)
  }

  // Safe alias of get
  //
  // @param {String} key
  // @param {Function} callback
  get = (key, callback) => {
    if (this.client == null) {
      return callback()
    }
    return this.client.get(key, callback)
  }

  // Iterates through a hash and calls JSON.stringify on each value. This is useful
  // when storing a big hash of models/collections to be deserialized later
  // (e.g. on the fair page).
  //
  // @param {String} key Redis key
  // @param {Object} hash

  setHash = (key, hash) => {
    if (this.client == null) {
      return
    }
    const serialized = {}
    for (let k in hash) {
      const v = hash[k]
      serialized[k] = JSON.stringify(v)
    }
    this.client.set(key, JSON.stringify(hash))
    return this.client.expire(key, Number(DEFAULT_CACHE_TIME))
  }

  // Retrieves a serialized hash from `setHash` and deserializes it into models and
  // collections. Pass in a hash of key: Model/Colllection class pairs to indicate
  // what each key gets deserialized into.
  //
  // e.g.
  //
  // cache.getHash 'fair:' + id, {
  //   fair: require('../../models/fair')
  //   artworks: require('../../collections/artworks')
  // }, ->
  //
  // @param {String} key Redis key to GET
  // @param {Object} hash key: Model/Collection pairs
  // @param {Function} callack Calls back with (err, deserializedHash)

  getHash = (key, hash, callback) => {
    if (this.client == null) {
      return callback()
    }
    return this.client.get(key, function (err, json) {
      if (err) {
        return callback(err)
      }
      if (json) {
        const data = JSON.parse(json)
        const deserialized = {}
        for (key in data) {
          json = data[key]
          const klass = hash[key]
          deserialized[key] = klass != null ? new klass(json) : json
        }
        return callback(null, deserialized)
      } else {
        return callback()
      }
    })
  }

  flushall = callback => {
    if (this.client == null) {
      return callback()
    }
    return this.client.flushall(callback)
  }
}

export const cache = new Cache()
