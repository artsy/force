Q = require 'q'
_ = require 'underscore'

module.exports =
  fetchUntilEndInParallel: (options = {}) ->
    dfd = Q.defer()

    { success, error } = options # Pull out original success and error callbacks

    { size } = options.data = _.defaults (options.data or {}), total_count: 1, size: 10

    options.remove = false

    options.error = =>
      dfd.reject arguments...
      error? arguments...

    options.success = (collection, response, opts) =>
      total = parseInt(opts?.res?.headers?['x-total-count'] or 0)

      if response.length >= total # Return if already at the end or no total
        dfd.resolve this
        success? this
      else
        remaining = Math.ceil(total / size) - 1

        Q.allSettled(_.times(remaining, (n) =>
          @fetch cache: options.cache, remove: options.remove, data: _.extend { page: n + 2 }, options.data
        )).then(=>
          dfd.resolve this
          success? this
        , =>
          dfd.reject this
          error? this
        ).done()

    @fetch options
    dfd.promise
