{ Profile } = require '../../models/profile'

module.exports.index = (req, res, next) ->
  return next() unless req.profile?.isUser()
  req.profile.fetch
    cache: true
    success: (profile) ->
      res.render 'template', profile: profile
    error: res.backboneError

module.exports.setProfile = (req, res, next) ->
  data = {}
  data.access_token = req.user.get('accessToken') if req.user
  # if there is already a profile set
  # go to the next route
  return next() if req.profile
  new Profile(id: req.params.id).fetch
    cache: true
    data: data
    success: (profile) ->
      res.locals.sd.PROFILE = profile.toJSON()
      req.profile = profile
      next()
    error: -> next()

module.exports.redirectEditorial = (req, res, next) ->
  res.redirect 301, req.url.replace 'editorial', 'articles'
