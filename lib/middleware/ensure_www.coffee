#
# Ensures requests to artsy.net have www if the APP_URL has www
#

{ APP_URL } = require '../../config'
{ parse } = require 'url'

module.exports = (req, res, next) ->
  if parse(APP_URL).host.match('www') and not req.get('host').match('www')
    res.redirect 301, APP_URL + req.url
  else
    next()