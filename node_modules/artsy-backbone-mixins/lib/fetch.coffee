_         = require 'underscore'
Backbone  = require 'backbone'
{ parse } = require("url")

ARTSY_URL = ''

module.exports = (a) ->
  ARTSY_URL = a
  module.exports.methods

module.exports.methods =

  # For paginated routes, this will recursively fetch until the end of the set.
  #
  # @param {Object} options Backbone sync options like `success` and `error`

  fetchUntilEnd: (options = {}) ->
    page = options.data?.page - 1 or 0
    opts = _.clone(options)
    fetchPage = =>
      @fetch _.extend opts,
        data: _.extend (opts.data ? {}), page: page += 1
        remove: false
        success: (col, res) =>
          if res.length is 0 then options.success?(@) else fetchPage()
        error: options.error
    fetchPage()

  # Fetches a set by key and populates the collection with the first result.
  #
  # @param {String} key
  # @param {Object} options Backbone sync options like `success` and `error`

  fetchSetItemsByKey: (key, options = {}) ->
    new Backbone.Collection(null).fetch
      url: "#{ARTSY_URL}/api/v1/sets?key=#{key}"
      cache: options.cache
      success: (sets) =>
        return options.success(@) unless sets.length
        new Backbone.Collection(null).fetch
          url: "#{ARTSY_URL}/api/v1/set/#{sets.first().get 'id'}/items"
          cache: options.cache
          success: (col) =>
            @reset col.toJSON()
            options.success @
          error: options.error
      error: options.error
