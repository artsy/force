#
# Sends a percent of traffic to a proxied merged Force + MG app.
# See https://github.com/artsy/force-merge for more details.
#

httpProxy = require 'http-proxy'
{ FORCE_MERGE_URL, FORCE_MERGE_WEIGHT } = require "../../config"

proxy = httpProxy.createProxyServer()
weight = Number FORCE_MERGE_WEIGHT

module.exports = (req, res, next) ->
  inMerged = req.session.inMergedForce ?= Math.random() < weight
  if weight > 0 and inMerged
    proxy.web req, res, target: FORCE_MERGE_URL
  else
    next()
