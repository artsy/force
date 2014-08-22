module.exports = (req, res, next) ->
  res.locals.sd.INCLUDE_ESCAPED_FRAGMENT = not (req.query && Object.keys(req.query).length > 0)
  next()
