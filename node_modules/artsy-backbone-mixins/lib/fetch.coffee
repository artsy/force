_ = require 'underscore'
Q = require 'q'
Qs = require 'qs'
Backbone = require 'backbone'
{ parse } = require 'url'

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
        complete: ->
        success: (col, res) =>
          options.each? col, res
          if res.length is 0
            options.success?(@)
            options.complete?(@)
          else
            fetchPage()
        error: ->
          options.error? arguments...
          options.complete?()
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

  # For paginated routes, this will fetch the first page along with the total count
  # then fetch every remaining page in parallel
  #
  # @param {Object} options Backbone sync options like `success` and `error`

  fetchUntilEndInParallel: (options = {}) ->
    dfd = Q.defer()

    { success, error } = options # Pull out original success and error callbacks

    { size } = options.data = _.defaults (options.data or {}), total_count: 1, size: 10

    options.remove = false

    options.data = decodeURIComponent Qs.stringify(options.data, {indices: false})

    options.error = =>
      dfd.reject arguments...
      error? arguments...

    options.success = (collection, response, opts) =>
      total = parseInt(
        # Count when server-side
        opts?.res?.headers?['x-total-count'] or
        # Count when client-side
        opts?.xhr?.getResponseHeader?('X-Total-Count') or
        # Fallback
        0
      )

      if response.length >= total # Return if already at the end or no total
        dfd.resolve this
        success? this
      else

        options.data = Qs.parse options.data

        remaining = Math.ceil(total / size) - 1

        Q.allSettled(_.times(remaining, (n) =>
          # if stringify flag is passed, convert the data object into a query string
          # (stringify is used to keep params with arrays formated properly)
          data = _.extend(_.omit(options.data, 'total_count'), { page: n + 2 })
          data = decodeURIComponent Qs.stringify(data, {indices: false})

          @fetch _.extend _.omit(options, 'success', 'error'), {
            data: data
          }

        )).then(=>
          dfd.resolve this
          success? this, response, opts
        , =>
          dfd.reject this
          error? this, response, opts
        ).done()

    @fetch options
    dfd.promise
