#
# Currently just a blank page for native
# apps to use in preparing network caches
#

express = require 'express'
sd = require('sharify').data

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

{ NODE_ENV } = require '../../../config'
app.set 'view cache', NODE_ENV is 'production'

app.get '/dev/blank', (req, res) ->
  res.render 'blank',
    env: NODE_ENV
    view_cache_enabled: app.enabled 'view cache'

app.get "/#{sd.FACEBOOK_DOMAIN_VERIFICATION}.html", (req, res) ->
  res.send "#{sd.FACEBOOK_DOMAIN_VERIFICATION}"
