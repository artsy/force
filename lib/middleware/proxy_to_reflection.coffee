#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#

_                   = require 'underscore'
request             = require 'superagent'
{ parse }           = require 'url'
{ REFLECTION_URL }  = require '../../config'

namedParam = /(\(\?)?:\w+/g

module.exports.proxy = proxy =
  # Keys are patterns that we want to redirect
  # Values are functions that transform the pattern into the desired URL
  blacklist:
    '/artwork/:artwork_id/view-in-room' : (route, artwork_id) -> "/artwork/#{artwork_id}"
    '/artwork/:artwork_id/more-info'    : (route, artwork_id) -> "/artwork/#{artwork_id}"
    '/artwork/:artwork_id/inquire'      : (route, artwork_id) -> "/artwork/#{artwork_id}"
    '/artwork/:artwork_id/zoom'         : (route, artwork_id) -> "/artwork/#{artwork_id}"

  compileRoute: (route) ->
    route = route.replace namedParam, '([^/?]+)'
    "^#{route}(?:\\?([\\s\\S]*))?$"

  detectRoute: (path) ->
    _.find _.keys(@compiledBlacklist()), (route) ->
      new RegExp(route).test path

  compiledBlacklist: ->
    @__compiledBlacklist__ ?=
      _.reduce (@blacklist), (memo, v, k) =>
        memo[@compileRoute(k)] = v
        memo
      , {}

  handle: (path, res) ->
    if route = @detectRoute path
      args  = path.match(new RegExp route)
      path  = @compiledBlacklist()[route] args...

    request.get(REFLECTION_URL + path).end (resp) ->
      res.send(resp.text)

module.exports.middleware = (req, res, next) ->
  if req.query._escaped_fragment_?
    proxy.handle parse(req.url).pathname, res
  else
    next()
