#
# Proxy all requests for sitemaps to S3, where they've been generated offline.
#

{ SITEMAP_BASE_URL } = require '../../config'
{ parse } = require 'url'
sitemap_host = parse(SITEMAP_BASE_URL).host
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer(target: SITEMAP_BASE_URL)
express = require 'express'

app = module.exports.app = express()

app.all '/sitemap*', (req, res) ->
  req.headers['host'] = sitemap_host
  proxy.web req, res
