#
# Redirect unsupported browsers to an unsupported browser page
#
{ parse } = require 'url'
uaParser = require 'ua-parser'

isUnsupported = (ua, req) ->
  not req.cookies.continue_with_bad_browser and ((ua.family is 'IE' and ua.major < 9) or (ua.family is 'Safari' and ua.major < 6))

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
