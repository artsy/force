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
crypto = require 'crypto'
{ parse } = require 'url'

# Hoist the XAPP token out of a request and store it at the module level for
# the passport callbacks to access. (Seems like there should be a better way to access
# request-level data in the passport callbacks.)
artsyXappToken = null

# Default options
opts =
  facebookPath: '/users/auth/facebook'
  twitterPath: '/users/auth/twitter'
  loginPath: '/users/sign_in'
  signupPath: '/users/invitation/accept'
  twitterCallbackPath: '/users/auth/twitter/callback'
  facebookCallbackPath: '/users/auth/facebook/callback'
  userKeys: ['id', 'type', 'name', 'email', 'phone', 'lab_features', 'default_profile_id']
  twitterSignupTempEmail: (token) ->
    hash = crypto.createHash('sha1').update(token).digest('hex').substr(0, 12)
    "uknown-#{hash}@#{parse(opts.SECURE_ARTSY_URL).hostname}"

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
  app.post opts.loginPath, localAuth
  app.post opts.signupPath, signup, passport.authenticate('local')
  app.get opts.twitterPath, socialAuth('twitter')
  app.get opts.facebookPath, socialAuth('facebook')
  app.get opts.twitterCallbackPath, socialAuth('twitter'), socialSignup('twitter')
  app.get opts.facebookCallbackPath, socialAuth('facebook'), socialSignup('facebook')
  app.use addLocals

localAuth = (req, res, next) ->
  passport.authenticate('local', (err, user, info) ->
    return req.login(user, next) if user

    res.authError = info; next()
  )(req, res, next)

socialAuth = (provider) ->
  (req, res, next) ->
    artsyXappToken = res.locals.artsyXappToken if res.locals.artsyXappToken
    passport.authenticate(provider,
      callbackURL: "#{opts.APP_URL}#{opts[provider + 'CallbackPath']}?#{qs.stringify req.query}"
      scope: 'email'
    )(req, res, next)

# We have to hack around passport by capturing a custom error message that indicates we've
# created a user in one of passport's social callbacks. If we catch that error then we'll
# attempt to redirect back to login and strip out the expired Facebook/Twitter credentials.
socialSignup = (provider) ->
  (err, req, res, next) ->
    return next(err) unless err is 'artsy-passport: created user from social'

    # Redirect to a social login url stripping out the Facebook/Twitter credentials
    # (code, oauth_token, etc). This will be seemless for Facebook, but since Twitter has a
    # ask for permision UI it will mean asking permission twice. It's not apparent yet why
    # we can't re-use the credentials... without stripping them we get errors from FB & Twitter.
    querystring = qs.stringify _.omit(req.query, 'code', 'oauth_token', 'oauth_verifier')
    url = (opts["#{provider}SignupPath"] or opts["#{provider}Path"]) + '?' + querystring
    res.redirect url

signup = (req, res, next) ->
  request.post(opts.SECURE_ARTSY_URL + '/api/v1/user').send(
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
  request.get("#{opts.SECURE_ARTSY_URL}/oauth2/access_token").query(
    client_id: opts.ARTSY_ID
    client_secret: opts.ARTSY_SECRET
    grant_type: 'credentials'
    email: username
    password: password
  ).end accessTokenCallback(done)

facebookCallback = (accessToken, refreshToken, profile, done) ->
  request.get("#{opts.SECURE_ARTSY_URL}/oauth2/access_token").query(
    client_id: opts.ARTSY_ID
    client_secret: opts.ARTSY_SECRET
    grant_type: 'oauth_token'
    oauth_token: accessToken
    oauth_provider: 'facebook'
  ).end accessTokenCallback(done,
    oauth_token: accessToken
    provider: 'facebook'
    name: profile?.displayName
  )

twitterCallback = (token, tokenSecret, profile, done) ->
  request.get("#{opts.SECURE_ARTSY_URL}/oauth2/access_token").query(
    client_id: opts.ARTSY_ID
    client_secret: opts.ARTSY_SECRET
    grant_type: 'oauth_token'
    oauth_token: token
    oauth_token_secret: tokenSecret
    oauth_provider: 'twitter'
  ).end accessTokenCallback(done,
    oauth_token: token
    oauth_token_secret: tokenSecret
    provider: 'twitter'
    email: opts.twitterSignupTempEmail(token, tokenSecret, profile)
    name: profile?.displayName
  )

accessTokenCallback = (done, params) ->
  return (err, res) ->

    # Create a user from the response, or throw any internal errors or error sent
    # from the API.
    err = (err?.toString() or res?.body.error_description or res?.body.error)

    # Success
    unless err?
      return done(null, new opts.CurrentUser(accessToken: res?.body.access_token))

    # If there's no user linked to this account, create the user via the POST /user API.
    # Then pass on an empty user so our signup middleware can catch it, login, and move on.
    if err?.match?('no account linked')
      params.xapp_token = artsyXappToken
      request
        .post(opts.SECURE_ARTSY_URL + '/api/v1/user')
        .send(params)
        .end (err, res) ->
          err = (err or res?.body.error_description or res?.body.error)
          done err or 'artsy-passport: created user from social'

    # Invalid email or password
    else if err.match?('invalid email or password')
      done null, false, err

    # Other errors
    else
      done err

#
# Serialize user by fetching and caching user data in the session.
#
serializeUser = (user, done) ->
  user.fetch
    success: ->
      keys = ['accessToken'].concat opts.userKeys
      done null, user.pick(keys)
    error: (m, e) -> done e.text

deserializeUser = (userData, done) ->
  done null, new opts.CurrentUser(userData)
