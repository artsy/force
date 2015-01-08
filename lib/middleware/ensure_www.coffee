#
# Ensures requests to artsy.net have www if the APP_URL has www
#

_ = require 'underscore'
{ APP_URL } = require '../../config'
{ parse } = require 'url'

module.exports = (req, res, next) ->
  if parse(APP_URL).host.match('www') and not req.get('host').match('www')
    res.clearCookie('force.sess')
    res.clearCookie('force.sess.sig')
    res.session = null
    res.redirect 301, APP_URL + req.url
  else
    next()