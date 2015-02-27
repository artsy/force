#
# Makes sure that any http requests get redirected to https
#

{ APP_URL } = require '../../config'
{ parse } = require 'url'

module.exports = (req, res, next) ->
  protocol = req.get('X-Forwarded-Proto') or req.protocol
  if protocol isnt 'https' and parse(APP_URL).protocol is 'https:'
    res.redirect 301, APP_URL + req.url
  else
    next()
