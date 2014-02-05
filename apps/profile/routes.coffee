Profile = require '../../models/profile'

fetchProfile = (req, next) ->
  return next() unless (profile = req.profile)?.isUser()
  res.locals.sd.PROFILE = profile.toJSON()

@setProfile = (req, res, next) ->
  return next() if req.profile
  new Profile(id: req.params.id).fetch
    cache: true
    success: (profile) -> req.profile = profile; next()
    error: ->
      console.log '!!!!!!!!!!!!!!!! running next'
      next()

@index = (req, res, next) ->
  fetchProfile req, next
  res.render 'templates',
    profile : req.profile

@posts = (req, res, next) ->
  fetchProfile req, next
  if profile.get('posts_count')
    res.render 'templates',
      profile : req.profile
  else
    res.redirect profile.href()

@favorites = (req, res, next) ->
  fetchProfile req, next
  res.render 'templates',
    profile : req.profile
