_ = require 'underscore'

module.exports =
  blacklist: [
    '^/personalize'
  ]

  path: ->
    location.pathname

  current: ->
    @path().replace /\/$/, ''

  test: (pattern) ->
    new RegExp(pattern).test @current()

  check: ->
    _.any _.map(@blacklist, _.bind(@test, this))
