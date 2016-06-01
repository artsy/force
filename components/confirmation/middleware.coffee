module.exports = (req, res, next) ->
  res.locals.sd.CONFIRMATION = req.session.confirmation
  req.session.confirmation = null
  next()
