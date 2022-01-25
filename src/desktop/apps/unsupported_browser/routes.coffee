sanitizeRedirect = require '../../../lib/passport/sanitize-redirect'

#
# Message users of unsupported browsers to upgrade
# See also: lib/middleware/unsupportedBrowser.ts
#
@index = (req, res) ->
  res.render 'template'

#
# Allow the user to continue with an unsupported browser for 24hrs.
# See also: lib/middleware/unsupportedBrowser.ts
#
@continueAnyway = (req, res) ->
  tomorrow = new Date (new Date()).getTime() + (24*60*60*1000)
  res.cookie 'continue_with_bad_browser', 1, { expires: tomorrow }
  url = req.body['redirect-to'] or '/'
  res.redirect sanitizeRedirect(url)
