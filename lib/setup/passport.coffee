# 
# Uses [passport.js](http://passportjs.org/) to setup authentication with various
# providers like direct login with Artsy, or oauth signin with Facebook or Twitter.
# 

_ = require 'underscore'
request = require 'superagent'
passport = require 'passport'
FacebookStrategy = require('passport-facebook').Strategy
TwitterStrategy = require('passport-twitter').Strategy
LocalStrategy = require('passport-local').Strategy
{ FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, PORT, CLIENT_ID, CLIENT_SECRET, FORCE_URL,
  SECURE_URL, GRAVITY_URL, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require '../../config'
CurrentUser = require '../../models/current_user'

module.exports = ->
  passport.serializeUser serializeUser
  passport.deserializeUser deserializeUser
  passport.use new LocalStrategy { usernameField: 'email' }, artsyCallback
  passport.use new FacebookStrategy
    clientID: FACEBOOK_APP_ID
    clientSecret: FACEBOOK_APP_SECRET
    callbackURL: "#{FORCE_URL}/auth/facebook/callback"
  , facebookCallback
  passport.use new TwitterStrategy
    consumerKey: TWITTER_CONSUMER_KEY
    consumerSecret: TWITTER_CONSUMER_SECRET
    callbackURL: "#{FORCE_URL}/auth/twitter/callback"
  , twitterCallback

artsyCallback = (username, password, done) ->
  request.get("#{SECURE_URL}/oauth2/access_token").query(
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
    grant_type: 'credentials'
    email: username
    password: password
  ).end accessTokenCallback(done)

facebookCallback = (accessToken, refreshToken, profile, done) ->
  request.get("#{SECURE_URL}/oauth2/access_token").query(
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
    grant_type: 'oauth_token'
    oauth_token: accessToken
    oauth_provider: 'facebook'
  ).end accessTokenCallback(done)
    
twitterCallback = (token, tokenSecret, profile, done) ->
  request.get("#{SECURE_URL}/oauth2/access_token").query(
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
    grant_type: 'oauth_token'
    oauth_token: token
    oauth_token_secret: tokenSecret
    oauth_provider: 'twitter'
  ).end accessTokenCallback(done)

serializeUser = (user, done) ->
  user.fetch
    success: -> done null, user.toJSON()
    error: (m, e) -> done e.text
  
deserializeUser = (userData, done) ->
  done null, new CurrentUser(userData)

accessTokenCallback = (done) ->
  return (err, res) ->
    done(
      (res.body.error_description or err)
      new CurrentUser(accessToken: res.body.access_token)
    )