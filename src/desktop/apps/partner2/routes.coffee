_ = require 'underscore'

layoutContains = (res = {}, types = []) ->
  layout = res.locals.profile?.get('owner')?.profile_layout
  _.contains types, layout

# Allow new layout for the following partner types
@requireNewLayout = (req, res, next) ->
  return next('route') unless res.locals.profile?.isPartner()
  newLayout = res.locals.sd.PARTNER_NEW_LAYOUT = layoutContains res, [
    'gallery_one'
    'gallery_two'
    'gallery_three'
    'gallery_four'
    'gallery_five'
    'gallery_six'
    'gallery_seven'
    'institution'
  ]
  if newLayout
    res.locals.sd.PAGE_TYPE = 'partner'
    next()
  else
    next('route')

@overview = (req, res, next) ->
  res.locals.sd.SECTION = 'overview'
  res.render 'index', params: req.params

@redirectToOverview = (req, res, next) ->
  return res.redirect("/#{req.params.id}")

@shows = (req, res, next) ->
  res.locals.sd.SECTION = 'shows'
  res.render 'index', params: req.params

@works = (req, res, next) ->
  res.locals.sd.SECTION = 'works'
  res.render 'index', params: req.params

@collection = (req, res, next) ->
  res.locals.sd.SECTION = 'collection'
  res.render 'index', params: req.params

@shop = (req, res, next) ->
  res.locals.sd.SECTION = 'shop'
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

@contact = (req, res, next) ->
  res.locals.sd.SECTION = 'contact'
  res.render 'index', params: req.params

@about = (req, res, next) ->
  res.locals.sd.SECTION = 'about'
  res.render 'index', params: req.params
