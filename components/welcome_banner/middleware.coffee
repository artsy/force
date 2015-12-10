module.exports = (req, res, next) ->
  key = 'hide-force-header'

  res.locals.sd.HIDE_HEADER = if req.cookies[key]?
    req.cookies[key]
  else if req.user?
    res.cookie key, dismiss = '1', expires: new Date(Date.now() + 31536000000)
    dismiss

  next()
