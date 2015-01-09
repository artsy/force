#
# Try to proxy unhandled requests to Gravity using node-http-proxy
# If the req can be handled by Gravity, proxy it to G
# If not, simply pass it to the next middleware
#

{ API_URL } = require '../../config'
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer()
express = require 'express'

module.exports.api = (req, res) ->
  proxy.web req, res, { target: API_URL }
