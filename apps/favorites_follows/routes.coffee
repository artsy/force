@follows = (req, res, next) ->
  return res.redirect("/") unless req.user
  if (route = req.params.type) in ['artists', 'genes']
    routeToKind = artists: 'artist', genes: 'gene'
    res.locals.sd.KIND = routeToKind[route] or 'artist'
    res.render 'follows', type: route
  else
    next()

@favorites = (req, res) ->
  return res.redirect("/") unless req.user
  res.render 'favorites', profileId: req.user.get('default_profile_id')