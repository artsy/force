module.exports = (req, res, next) ->
  _render = res.render
  res.render = (view, options, fn) ->
    res.locals.sd.FLASH = req.flash('info')?.join ', '
    _render.apply this, arguments
  next()
