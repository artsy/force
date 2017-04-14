express = require 'express'
routes = require './routes'
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer(changeOrigin: true, ignorePath: true)
{ WHITELISTED_VANITY_ASSETS, VANITY_BUCKET } = require '../../config.coffee'
{ crop } = require '../../components/resizer/index'
adminOnly = require '../../lib/admin_only'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop

app.get '/2016-year-in-art', routes.eoy

app.get '/2017-venice-biennale/jw', adminOnly, (req, res, next) ->
  res.render 'components/venice_2017/templates/jw'

app.get '/2017-venice-biennale/googlevr', adminOnly, (req, res, next) ->
  res.render 'components/venice_2017/templates/googlevr'

app.get '/2017-venice-biennale/aframe', adminOnly, (req, res, next) ->
  res.render 'components/venice_2017/templates/aframe'

app.get '/vanity/*', (req, res, next) ->
  whitelistedAssets = WHITELISTED_VANITY_ASSETS.split(',')
  return next() unless req.params[0] in whitelistedAssets
  req.headers['host'] = VANITY_BUCKET
  proxy.on 'error', (err) ->
    res.redirect 301, '/articles'
  target = 'https://' + VANITY_BUCKET + '.s3.amazonaws.com' + '/' + req.params[0]
  proxy.web req, res, target: target
