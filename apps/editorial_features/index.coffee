httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer(changeOrigin: true, ignorePath: true)
{ EOY_2016_TEASER } = require '../../config.coffee'
express = require 'express'
routes = require './routes'
adminOnly = require '../../lib/middleware/admin_only'
{ crop } = require '../../components/resizer/index'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop

app.get '/eoy-2016', adminOnly, routes.eoy

app.get '/2016-year-in-art', (req, res) ->
  req.headers['host'] = 'artsy-vanity-files-production'
  proxy.on 'error', (err) ->
    res.redirect 301, "/articles"
  proxy.web req, res, target: EOY_2016_TEASER
