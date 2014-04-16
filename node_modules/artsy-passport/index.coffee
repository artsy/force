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
  twitterLastStepPath: '/users/auth/twitter/email'
  userKeys: ['id', 'type', 'name', 'email', 'phone', 'lab_features', 'default_profile_id', 'has_partner_access']
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
  app.post opts.loginPath, localAuth, afterLocalAuth
  app.post opts.signupPath, signup, passport.authenticate('local'), afterLocalAuth
  app.get opts.twitterPath, socialAuth('twitter')
  app.get opts.facebookPath, socialAuth('facebook')
  app.get opts.twitterCallbackPath, socialAuth('twitter'), socialSignup('twitter')
  app.get opts.facebookCallbackPath, socialAuth('facebook'), socialSignup('facebook')
  app.get opts.twitterLastStepPath, loginBeforeTwitterLastStep
  app.post opts.twitterLastStepPath, submitTwitterLastStep
  app.use addLocals

localAuth = (req, res, next) ->
  passport.authenticate('local', (err, user, info) ->
    return req.login(user, next) if user

    res.authError = info; next()
  )(req, res, next)

afterLocalAuth = (req, res ,next) ->
  if res.authError
    res.send 403, { success: false, error: res.authError }
  else if req.accepts('application/json') and req.user?
    res.send { success: true, user: req.user.toJSON() }
  else if req.accepts('application/json') and not req.user?
    res.send { success: false, error: "Missing user." }
  else
    next()

socialAuth = (provider) ->
  (req, res, next) ->
    return next("#{provider} denied") if req.query.denied
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
    return next(err) unless err.message is 'artsy-passport: created user from social'

    # Redirect to a social login url stripping out the Facebook/Twitter credentials
    # (code, oauth_token, etc). This will be seemless for Facebook, but since Twitter has a
    # ask for permision UI it will mean asking permission twice. It's not apparent yet why
    # we can't re-use the credentials... without stripping them we get errors from FB & Twitter.
    querystring = qs.stringify _.omit(req.query, 'code', 'oauth_token', 'oauth_verifier')
    url = (if provider is 'twitter' then opts.twitterLastStepPath else opts.facebookPath) +
          '?' + querystring
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

loginBeforeTwitterLastStep = (req, res, next) ->
  passport.authenticate('twitter',
    callbackURL: "#{opts.APP_URL}#{opts.twitterLastStepPath}"
  )(req, res, next)

submitTwitterLastStep = (req, res, next) ->
  return next "No user" unless req.user
  return next "No email provided" unless req.param('email')?
  request.put("#{opts.SECURE_ARTSY_URL}/api/v1/me").send(
    email: req.param('email')
    email_confirmation: req.param('email')
    access_token: req.user.get('accessToken')
  ).end (r) ->
    err = r.error or r.body?.error_description or r.body?.error
    err = null if r.text.match 'Error from MailChimp API'
    return next err if err
    # To work around an API caching bug we send another empty PUT
    request.put("#{opts.SECURE_ARTSY_URL}/api/v1/me").send(
      access_token: req.user.get('accessToken')
    ).end ->
      err = r.error or r.body?.error_description or r.body?.error
      err = null if r.text.match 'Error from MailChimp API'
      return next err if err
      res.redirect req.param('redirect-to')

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
    passReqToCallback: true
  , facebookCallback
  passport.use new TwitterStrategy
    consumerKey: opts.TWITTER_KEY
    consumerSecret: opts.TWITTER_SECRET
    callbackURL: "#{opts.APP_URL}#{opts.twitterCallbackPath}"
    passReqToCallback: true
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

facebookCallback = (req, accessToken, refreshToken, profile, done) ->
  if req.user
    request.post("#{opts.SECURE_ARTSY_URL}/api/v1/me/authentications/facebook").query(
      oauth_token: accessToken
      access_token: req.user.get 'accessToken'
    ).end (res) ->
      done (if res.error then res.body.error + ': Facebook' else ''), req.user
  else
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

twitterCallback = (req, token, tokenSecret, profile, done) ->
  if req.user
    request.post("#{opts.SECURE_ARTSY_URL}/api/v1/me/authentications/twitter").query(
      oauth_token: token
      oauth_token_secret: tokenSecret
      access_token: req.user.get 'accessToken'
    ).end (res) ->
      done (if res.error then res.body.error + ': Twitter' else ''), req.user
  else
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
  return (e, res) ->

    # Catch the various forms of error Artsy could encounter
    err = null
    try
      err = JSON.parse(res.text).error_description
      err ?= JSON.parse(res.text).error
    err ?= "Artsy returned a generic #{res.status}" if res.status > 400
    err ?= "Artsy returned no access token and no error" unless res.body.access_token?
    err ?= e

    # If there are no errors create the user from the access token
    unless err
      return done(null, new opts.CurrentUser(accessToken: res.body.access_token))

    # If there's no user linked to this account, create the user via the POST /user API.
    # Then pass a custom error so our signup middleware can catch it, login, and move on.
    if err?.match?('no account linked')
      params.xapp_token = artsyXappToken
      request
        .post(opts.SECURE_ARTSY_URL + '/api/v1/user')
        .send(params)
        .end (err, res) ->
          err = (err or res?.body.error_description or res?.body.error)
          done err or { message: 'artsy-passport: created user from social', user: res.body }

    # Invalid email or password
    else if err.match?('invalid email or password')
      done null, false, err

    # Other errors
    else
      console.warn "Error requesting an access token from Artsy: " + res.text
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
