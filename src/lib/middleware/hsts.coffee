#
# HSTS allows for a more effective implementation of TLS by ensuring
# all communication takes place over a secure transport layer on the client side.
# See https://scotthelme.co.uk/hsts-the-missing-link-in-tls.
#

{ APP_URL } = require '../../config'
{ parse } = require 'url'

module.exports = (req, res, next) ->
  protocol = req.get('X-Forwarded-Proto') or req.protocol
  if protocol is 'https' and parse(APP_URL).protocol is 'https:'
    res.set('Strict-Transport-Security', 'max-age=31536000') unless res.headersSent
  next()
