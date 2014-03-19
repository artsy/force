#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#

request             = require 'superagent'
{ parse }           = require 'url'
{ REFLECTION_URL }  = require '../../config'

module.exports = (req, res, next) ->
  if req.query._escaped_fragment_?
    request.get(REFLECTION_URL + parse(req.url).pathname).end (resp) ->
      res.send(resp.text)
  else
    next()
