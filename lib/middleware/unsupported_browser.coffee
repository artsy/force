#
# Redirect unsupported browsers to an unsupported browser page
#
{ parse } = require 'url'
uaParser = require 'ua-parser'

isUnsupported = (ua, req) ->
  (ua.family is 'IE' and ua.major < 9) and
    not req.cookies.continue_with_bad_browser

getRedirectTo = (req) ->
  req.body['redirect-to'] or req.query['redirect-to'] or req.query['redirect_uri'] or parse(req.get('Referrer') or '').path or '/'

module.exports = (req, res, next) ->
  ua = uaParser.parseUA req.headers['user-agent']
  res.locals.sd.BROWSER = ua unless res.locals.sd.BROWSER
  if isUnsupported(ua, req) and not /\/unsupported-browser|assets|fonts|images/.test(req.path)
    res.locals.sd.UNSUPPORTED_BROWSER_REDIRECT = getRedirectTo req
    res.redirect '/unsupported-browser'
  else
    next()
