Profile = require '../../models/profile'

fetchProfile = (req, res, next) ->
  profile = req.profile
  return next() unless req.profile and req.profile.isUser()
  res.locals.sd.PROFILE = profile.toJSON()

@setProfile = (req, res, next) ->
  return next() if req.profile
  new Profile(id: req.params.id).fetch
    cache: true
    success: (profile) -> req.profile = profile; next()
    error: -> next()

@index = (req, res, next) ->
  fetchProfile req, res, next
  res.render 'templates',
    profile : req.profile

@posts = (req, res, next) ->
  fetchProfile req, res, next
  if profile.get('posts_count')
    res.render 'templates',
      profile : req.profile
  else
    res.redirect profile.href()

@favorites = (req, res, next) ->
  fetchProfile req, res, next
  res.render 'templates',
    profile : req.profile
