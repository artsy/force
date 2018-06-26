@requirePartner = (req, res, next) ->
  return next('route') unless res.locals.profile?.isPartner()
  res.locals.sd.PAGE_TYPE = 'partner'
  next()

@overview = (req, res, next) ->
  res.locals.sd.SECTION = 'overview'
  res.render 'index', params: req.params

@redirectToOverview = (req, res, next) ->
  return res.redirect("/#{req.params.id}")

@contact = (req, res, next) ->
  res.locals.sd.SECTION = 'contact'
  res.render 'index', params: req.params

@about = (req, res, next) ->
  res.locals.sd.SECTION = 'about'
  res.render 'index', params: req.params

@collection = (req, res, next) ->
  res.locals.sd.SECTION = 'collection'
  res.render 'index', params: req.params

@shop = (req, res, next) ->
  res.locals.sd.SECTION = 'shop'
  res.render 'index', params: req.params

@works = (req, res, next) ->
  res.locals.sd.SECTION = 'works'
  res.render 'index', params: req.params

@shows = (req, res, next) ->
  res.locals.sd.SECTION = 'shows'
  res.render 'index', params: req.params

@artists = (req, res, next) ->
  res.locals.sd.SECTION = 'artists'
  res.render 'index', params: req.params

@artist = (req, res, next) ->
  res.locals.sd.SECTION = 'artist'
  res.render 'index', params: req.params

@articles = (req, res, next) ->
  res.locals.sd.SECTION = 'articles'
  res.render 'index', params: req.params
