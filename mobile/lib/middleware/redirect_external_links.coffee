#
# For the native app that tries to point to certain external links
# (like m.artsy.net/http://2013.artsy.net) redirect those requests to the proper location.
#

module.exports = (req, res, next) ->
  if req.headers['user-agent']?.match(/Artsy-Mobile/) and req.url.match(/^\/http/)
    res.redirect req.url.replace(/^\//, '')
  else
    next()
