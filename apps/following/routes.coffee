@following = (req, res, next) ->
  return res.redirect("/") unless req.user

  if (type = req.params.type) in ['artists', 'genes']
    res.locals.sd.TYPE = type
    res.render 'index', type: type
  else
    next()

@favorites = (req, res) ->
  return res.redirect("/") unless req.user
  res.render 'favorites'
