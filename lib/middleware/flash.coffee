module.exports = (req, res, next) ->
  _render = res.render
  res.render = (view, options, fn) ->
    res.locals.sd.FLASH = req.flash('info')?.join '<br>'
    _render.apply this, arguments
  next()
