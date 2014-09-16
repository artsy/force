_ = require 'underscore'
fs = require 'fs'
express = require 'express'
Backbone = require 'backbone'
sharify = require 'sharify'
backboneSuperSync = require 'backbone-super-sync'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
path = require "path"
logger = require 'morgan'
artsyXappMiddlware = require('artsy-xapp-middleware')

artsyPassport = require '../'
config = require '../config.coffee'

# CurrentUser class
class CurrentUser extends Backbone.Model
  url: -> "#{config.SECURE_ARTSY_URL}/api/v1/me"
  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.access_token = @get 'accessToken'
    super

sharify.data = config

setup = (app) ->

  app.use sharify

  Backbone.sync = backboneSuperSync

  app.set 'views', __dirname
  app.set 'view engine', 'jade'

  app.use artsyXappMiddlware(
    artsyUrl: config.SECURE_ARTSY_URL
    clientId: config.ARTSY_ID
    clientSecret: config.ARTSY_SECRET
  )

  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)
  app.use cookieParser()
  app.use session
    secret: 'super-secret'
    key: 'artsy-passport'
  app.use logger('dev')

  app.use express.static __dirname + '/public'

  # Setup Artsy Passport
  app.use artsyPassport _.extend config,
    CurrentUser: CurrentUser
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

app = module.exports = express()
setup app
