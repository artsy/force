module.exports = function downcase(req, res, next) {
  const url = req._parsedUrl

  if (url.pathname.includes("/browse/booths/section/")) {
    next()
  } else if (/[A-Z]/.test(url.pathname)) {
    res.redirect(301, url.pathname.toLowerCase() + (url.search || ""))
  } else {
    next()
  }
}
