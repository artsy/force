_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
InstallShot = require '../models/install_shot.coffee'

module.exports = class InstallShots extends Backbone.Collection
  model: InstallShot

  fetchUntilEndInParallel: (options = {}) ->
    dfd = Q.defer()

    # Pull out original success and error callbacks
    { success, error } = options

    { size } = options.data = _.defaults (options.data or {}), total_count: 1, size: 10

    options.remove = false

    options.success = (modelOrCollection, response, opts) =>
      total = parseInt(opts.res.headers['x-total-count'])
      remaining = Math.ceil(total / size) - 1

      # Todo: Maintain order
      Q.allSettled(_.times remaining, (n) =>
        @fetch cache: options.cache, remove: options.remove, data: _.extend { page: n + 2 }, options.data
      ).then(=>
        dfd.resolve this
        success? this
      , =>
        dfd.resolve this
        error? this
      ).done()

    @fetch options
    dfd.promise
