express = require 'express'
artsyPassport = require '../'
Backbone = require 'backbone'
sharify = require 'sharify'
fs = require 'fs'
config = require '../config.coffee'
_ = require 'underscore'
backboneSuperSync = require 'backbone-super-sync'

# CurrentUser class
class CurrentUser extends Backbone.Model
  url: -> "#{config.SECURE_URL}/api/v1/me"
  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.access_token = @get 'accessToken'
    super

app = module.exports = express()

# Generic setup
Backbone.sync = backboneSuperSync
app.set 'views', __dirname
app.set 'view engine', 'jade'
app.use express.bodyParser()
app.use express.cookieParser('foobar')
app.use express.cookieSession()
app.use express.static __dirname + '/public'
app.use sharify config
app.use require('artsy-xapp-middleware')
  artsyUrl: config.SECURE_URL
  clientId: config.ARTSY_ID
  clientSecret: config.ARTSY_SECRET

# Setup Artsy Passport
app.use artsyPassport _.extend config,
  CurrentUser: CurrentUser
  sharifyData: sharify.data
{ loginPath, signupPath, twitterCallbackPath, facebookCallbackPath } = artsyPassport.options

# Artsy passport route handlers
app.post loginPath, (req, res) ->
  res.redirect '/'
app.post signupPath, (req, res) ->
  res.redirect '/personalize'
app.get twitterCallbackPath, (req, res) ->
  if req.query.sign_up then res.redirect('/personalize') else res.redirect('/')
app.get facebookCallbackPath, (req, res) ->
  if req.query.sign_up then res.redirect('/personalize') else res.redirect('/')

# App specific routes that render a login/signup form and logged in view
app.get '/', (req, res) ->
  if req.user? then res.render 'loggedin' else res.render 'login'
app.get '/personalize', (req, res) ->
  res.redirect '/' unless req.user?
  res.send 'Personalize Flow for ' + req.user.get('name')
app.get '/logout', (req, res) ->
  req.logout()
  res.redirect '/'

return unless module is require.main
app.listen 3000, -> console.log "Example listening on 3000"