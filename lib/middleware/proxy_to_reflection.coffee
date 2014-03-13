#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#

{ REFLECTION_URL } = require '../../config'
request = require 'superagent'

module.exports = (req, res, next) ->
  return next() unless req.query._escaped_fragment_?
  request.get(REFLECTION_URL + res.locals.sd.CURRENT_PATH).end((resp) -> res.send(resp.text))
