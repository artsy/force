#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#

request = require 'superagent'
{ parse } = require 'url'
{ REFLECTION_URL } = require '../../config'

module.exports = (req, res, next) ->
  if req.query._escaped_fragment_?
    request.get(reflectionUrl(req)).end (resp) ->
      res.send(resp.text)
  else
    next()

reflectionUrl = (req) ->
  url = parse(req.url)
  dest = REFLECTION_URL + url.pathname
  query = url.query?.replace(/&?_escaped_fragment_=/, '')
  dest += encodeURIComponent("?" + decodeURIComponent(query)) if query?.length
  dest
