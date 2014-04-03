#
# Redirect unsupported browsers to an unsupported browser page
#
uaParser = require 'ua-parser'

module.exports = (req, res, next) ->
  redirectTo = '/unsupported-browser'
  ua = uaParser.parseUA req.headers['user-agent']
  res.locals.sd.BROWSER = ua unless res.locals.sd.BROWSER
  regex = /\/unsupported-browser|assets|fonts|images/
  if ua.family is 'IE' and ua.major < 9 and not regex.test(req.path)
    res.redirect redirectTo
  else
    next()
