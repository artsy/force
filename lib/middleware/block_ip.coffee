#
# Blocks array of IP's
#

{ APP_URL, BLOCKED_IPS } = require '../../config'
{ parse } = require 'url'

module.exports = (req, res, next) ->
  blockedIPs = BLOCKED_IPS?.split(',')
  ip = req.headers['x-forwarded-for']

  if ip and blockedIPs.indexOf(ip) > -1
    res.writeHead 429
    res.end "Too many requests"
  else
    next()