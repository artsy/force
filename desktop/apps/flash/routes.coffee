@index = (req, res, next) ->
  req.flash (req.body.type or 'info'), req.body.message
  res.send message: req.body.message
