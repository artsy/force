_ = require 'underscore'

layoutContains = (res = {}, types = []) ->
  layout = res.locals.profile?.get('owner')?.profile_layout
  _.contains types, layout

# Allow new layout for the following partner types
@requireNewLayout = (req, res, next) ->
  newLayout = res.locals.sd.PARTNER_NEW_LAYOUT = layoutContains res, [
    'gallery_one'
    'gallery_two'
    'gallery_three'
    'institution'
  ]
  if newLayout then next() else next('route')

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

@contact = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'contact'
  res.render 'index', params: req.params

@about = (req, res, next) ->
  return next() unless res.locals.profile?.isPartner()
  res.locals.sd.SECTION = 'about'
  res.render 'index', params: req.params
