_         = require 'underscore'
Backbone  = require 'backbone'
{ parse } = require("url")
{ REDIS_URL, DEFAULT_CACHE_TIME, NODE_ENV } = require '../config'

client = undefined

# Setup redis client
if not window?
  redis = require 'redis'
  if NODE_ENV == 'development' and
    client = redis.createClient()
  else if NODE_ENV != 'test' and REDIS_URL?
    red = parse(REDIS_URL || '');
    client = redis.createClient(red.port, red.hostname);
    client.auth(red.auth.split(':')[1]);

module.exports = (artsyUrl) ->

  # For paginated routes, this will recursively fetch until the end of the set.
  #
  # @param {Object} options Backbone sync options like `success` and `error`

  fetchUntilEnd: (options = {}) ->
    key = "fetch-until-end:#{JSON.stringify(options)}"
    success = =>
      page = 0
      opts = _.clone(options)
      fetchPage = =>
        @fetch _.extend opts,
          data: _.extend (opts.data ? {}), page: page += 1
          remove: false
          success: (col, res) =>
            if res.length is 0
              if client
                client.set key, JSON.stringify(@models)
                client.expire key, DEFAULT_CACHE_TIME
              options.success?(@)
            else
              fetchPage()
          error: options.error
      fetchPage()

    if client
      client.get key, (err, json) =>
        if json
          @reset JSON.parse(json)
          options.success?(@)
        else
          success()
    else
      success()

  # Fetches a set by key and populates the collection with the first result.
  #
  # @param {String} key
  # @param {Object} options Backbone sync options like `success` and `error`

  fetchSetItemsByKey: (key, options = {}) ->
    new Backbone.Collection(null).fetch
      url: "#{artsyUrl}/api/v1/sets?key=#{key}"
      cache: options.cache
      success: (sets) =>
        return options.success(@) unless sets.length
        new Backbone.Collection(null).fetch
          url: "#{artsyUrl}/api/v1/set/#{sets.first().get 'id'}/items"
          cache: options.cache
          success: (col) =>
            @reset col.toJSON()
            options.success @
          error: options.error
      error: options.error
