module.exports = (req, res, next) ->
  url = req._parsedUrl

  if url.pathname.includes '/browse/booths/section/'
    next()
  else if /[A-Z]/.test url.pathname
    res.redirect 301, url.pathname.toLowerCase() + (url.search or '')
  else
    next()
