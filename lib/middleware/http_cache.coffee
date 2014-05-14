module.exports = (req, res, next) ->
  unless "development" is res.locals.sd.NODE_ENV
    res.setHeader('Date', new Date().toString())
  next()
