#
# Uses [passport.js](http://passportjs.org/) to setup authentication with various
# providers like direct login with Artsy, or oauth signin with Facebook or Twitter.
#

_ = require 'underscore'
request = require 'superagent'
express = require 'express'
passport = require 'passport'
FacebookStrategy = require('passport-facebook').Strategy
TwitterStrategy = require('passport-twitter').Strategy
LocalStrategy = require('passport-local').Strategy
qs = require 'querystring'

# Default options
opts =
  facebookPath: '/users/auth/facebook'
  twitterPath: '/users/auth/twitter'
  loginPath: '/users/sign_in'
  signupPath: '/users/invitation/accept'
  twitterCallbackPath: '/users/auth/twitter/callback'
  facebookCallbackPath: '/users/auth/facebook/callback'

#
# Main function that overrides/injects any options, sets up passport, sets up an app to
# handle routing and injecting locals, and returns that app to be mounted as middleware.
#
module.exports = (options) =>
  module.exports.options = _.extend opts, options
  initPassport()
  initApp()
  app

#
# Setup the mounted app that routes signup/login and injects necessary locals.
#
module.exports.app = app = express()

initApp = ->
  app.use passport.initialize()
  app.use passport.session()
  app.post opts.loginPath, passport.authenticate('local')
  app.post opts.signupPath, signup, passport.authenticate('local')
  app.get opts.twitterPath, socialAuth('twitter')
  app.get opts.facebookPath, socialAuth('facebook')
  app.get opts.twitterCallbackPath, socialSignup('twitter'), socialAuth('twitter')
  app.get opts.facebookCallbackPath, socialSignup('facebook'), socialAuth('facebook')
  app.use addLocals

socialAuth = (provider) ->
  (req, res, next) ->
    passport.authenticate(provider,
      callbackURL: "#{opts.APP_URL}#{opts[provider + 'CallbackPath']}?#{qs.stringify req.query}"
    )(req, res, next)

# TODO: https://www.pivotaltracker.com/story/show/62170902
socialSignup = (provider) ->
  (req, res, next) ->
    return next() unless req.query.sign_up
    request.post(opts.SECURE_URL + '/api/v1/user').send(
      provider: provider
      oauth_token: req.query.oauth_token
      oauth_token_secret: req.query.oauth_verifier
      xapp_token: res.locals.artsyXappToken
    ).end onCreateUser(next)

signup = (req, res, next) ->
  request.post(opts.SECURE_URL + '/api/v1/user').send(
    name: req.body.name
    email: req.body.email
    password: req.body.password
    xapp_token: res.locals.artsyXappToken
  ).end onCreateUser(next)

onCreateUser = (next) ->
  (err, res) ->
    if res.status isnt 201
      errMsg = res.body.message
    else
      errMsg = err?.text
    if errMsg then next(errMsg) else next()

addLocals = (req, res, next) ->
  if req.user
    res.locals.user = req.user
    res.locals.sd?.CURRENT_USER = req.user.toJSON()
  next()

#
# Setup passport.
#
initPassport = ->
  passport.serializeUser serializeUser
  passport.deserializeUser deserializeUser
  passport.use new LocalStrategy { usernameField: 'email' }, artsyCallback
  passport.use new FacebookStrategy
    clientID: opts.FACEBOOK_ID
    clientSecret: opts.FACEBOOK_SECRET
    callbackURL: "#{opts.APP_URL}#{opts.facebookCallbackPath}"
  , facebookCallback
  passport.use new TwitterStrategy
    consumerKey: opts.TWITTER_KEY
    consumerSecret: opts.TWITTER_SECRET
    callbackURL: "#{opts.APP_URL}#{opts.twitterCallbackPath}"
  , twitterCallback

#
# Passport callbacks
#
artsyCallback = (username, password, done) ->
  request.get("#{opts.SECURE_URL}/oauth2/access_token").query(
    client_id: opts.ARTSY_ID
    client_secret: opts.ARTSY_SECRET
    grant_type: 'credentials'
    email: username
    password: password
  ).end accessTokenCallback(done)

facebookCallback = (accessToken, refreshToken, profile, done) ->
  request.get("#{opts.SECURE_URL}/oauth2/access_token").query(
    client_id: opts.ARTSY_ID
    client_secret: opts.ARTSY_SECRET
    grant_type: 'oauth_token'
    oauth_token: accessToken
    oauth_provider: 'facebook'
  ).end accessTokenCallback(done)

twitterCallback = (token, tokenSecret, profile, done) ->
  request.get("#{opts.SECURE_URL}/oauth2/access_token").query(
    client_id: opts.ARTSY_ID
    client_secret: opts.ARTSY_SECRET
    grant_type: 'oauth_token'
    oauth_token: token
    oauth_token_secret: tokenSecret
    oauth_provider: 'twitter'
  ).end accessTokenCallback(done)

accessTokenCallback = (done) ->
  return (err, res) ->
    done(
      (res.body.error_description or err)
      new opts.CurrentUser(accessToken: res.body.access_token)
    )

#
# Serialize user by fetching and caching user data in the session.
#
serializeUser = (user, done) ->
  user.fetch
    success: -> done null, user.toJSON()
    error: (m, e) -> done e.text

deserializeUser = (userData, done) ->
  done null, new opts.CurrentUser(userData)