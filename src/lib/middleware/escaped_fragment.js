module.exports = function escapedFragment(req, res, next) {
  res.locals.sd.INCLUDE_ESCAPED_FRAGMENT = !(
    req.query && Object.keys(req.query).length > 0
  )
  next()
}
