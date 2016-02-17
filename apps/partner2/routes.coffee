# Skip the rest of the middlewares from this route stack for non-admins,
# and fallback (next) to the old partner app routes.
@requireAdmin = (req, res, next) ->
  if req.user?.isAdmin() then next() else next('route')

@overview = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'overview'
  res.render 'index', params: req.params

@redirectToOverview = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  return res.redirect("/#{req.params.id}")

@shows = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'shows'
  res.render 'index', params: req.params

@works = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'works'
  res.render 'index', params: req.params

@collection = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'collection'
  res.render 'index', params: req.params

@shop = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'shop'
  res.render 'index', params: req.params

@artists = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'artists'
  res.render 'index', params: req.params

@artist = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'artist'
  res.render 'index', params: req.params

@articles = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'articles'
  res.render 'index', params: req.params
