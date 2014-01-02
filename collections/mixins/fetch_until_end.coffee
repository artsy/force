_ = require 'underscore'

module.exports =

  # For paginated routes, this will recursively fetch until the end of the set.
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

  fetchUntilEnd: (options = {}) ->
    page = 0
    opts = _.clone(options)
    fetchPage = =>
      @fetch _.extend opts,
        data: _.extend (opts.data ? {}), page: page += 1
        remove: false
        success: (col, res) =>
          if res.length is 0 then options.success?(@) else fetchPage()
        error: options.error
    fetchPage()
