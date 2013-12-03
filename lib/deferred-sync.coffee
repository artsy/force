((factory) ->
  if typeof define is 'function' and define.amd
    # AMD. Register as an anonymous module.
    define ['backbone', 'q'], factory
  else if typeof exports is 'object'
    # Node/CommonJS style for Browserify
    module.exports = factory
  else
    # Browser globals
    factory Backbone, Q
) (Backbone, Q) ->
  _sync = Backbone.sync

  newSync = (method, model, options) ->
    _success  = options.success
    _error    = options.error
    deferred  = Q.defer()

    options.success = (model, response, options) ->
      _success model, response, options if _success
      deferred.resolve model

    options.error = (model, response, options) ->
      _error model, response, options if _error
      deferred.reject response

    _sync method, model, options

    deferred.promise

  Backbone.sync = newSync
