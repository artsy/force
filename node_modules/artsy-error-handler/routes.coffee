_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'
template = null

module.exports = (options) ->
  template = options.template

render = (res, data) ->
  res.send jade.compile(fs.readFileSync(template), filename: template)(data)

# Since this is the last non-error-handling middleware
# use()d, we assume 404, as nothing else responded.
module.exports.pageNotFound = (req, res, next) ->
  if req.accepts 'html' # respond with html page
    data = _.extend
      code: 404
      error: 'Not Found'
      sd: {}
    , res.locals
    res.status 404
    render res, data
    return
  if req.accepts 'json' # respond with json
    res.send error: 'Not found'
    return
  # Default to plain-text. send()
  (res.type 'txt').send 'Not found'

# Error-handling middleware
module.exports.internalError = (err, req, res, next) ->
  res.status err.status or 500
  data = _.extend
    code: res.statusCode
    error: err
    detail: err.message or err.text or err.toString()
    sd: {}
  , res.locals
  render res, data

module.exports.socialAuthError = (err, req, res, next) ->
  if err.toString().match('User Already Exists')
    # Error urls need to be compatible with Gravity
    params =
      if req.url?.indexOf('facebook') > -1
        "?account_created_email=facebook"
      else if req.url?.indexOf('twitter') > -1
        "?account_created_email=twitter"
      else
        "?error=already-signed-up"
    res.redirect "/log_in#{params}"
  else if err.toString().match('Failed to find request token in session')
    res.redirect '/log_in?error=account-not-found'
  else if err.toString().match('twitter denied')
    res.redirect '/log_in?error=twitter-denied'
  else if err.toString().match("Another Account Already Linked: Twitter")
    res.redirect '/user/edit?error=twitter-already-linked'
  else if err.toString().match("Another Account Already Linked: Facebook")
    res.redirect '/user/edit?error=facebook-already-linked'
  else if err.toString().match "Could not authenticate you"
    res.redirect '/user/edit?error=could-not-auth'
  else
    next err

module.exports.loginError = (err, req, res, next) ->
  res.status switch err.message
    when 'invalid email or password' then 403
    else 500
  res.send { error: err.message }