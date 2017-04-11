express = require 'express'
routes = require './routes'
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer(changeOrigin: true, ignorePath: true)
{ WHITELISTED_VANITY_ASSETS, VANITY_BUCKET } = require '../../config.coffee'
{ crop } = require '../../components/resizer/index'
adminOnly = require '../../lib/middleware/admin_only'

app = module.exports = express()
app.set 'views', "#{__dirname}"
app.set 'view engine', 'jade'
app.locals.crop = crop

app.get '/2016-year-in-art', routes.eoy

app.get '/2017-venice-biennale', adminOnly, (req, res, next) ->
  res.render 'components/venice_2017/templates/index'

app.get '/vanity/:type/:id', adminOnly, (req, res, next) ->
  whitelistedAssets = WHITELISTED_VANITY_ASSETS.split(',')
  return next() unless (req.params.type + '/' + req.params.id) in whitelistedAssets

  req.headers['host'] = VANITY_BUCKET
  proxy.on 'error', (err) ->
    res.redirect 301, '/articles'
  target = 'https://' + VANITY_BUCKET + '.s3.amazonaws.com' + '/' + req.params.type + '/' + req.params.id
  proxy.web req, res, target: target