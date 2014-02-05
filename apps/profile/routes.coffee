Profile = require '../../models/profile'

fetchProfile = (req, res, next, success) ->
  profile = new Profile { id: req.params.id }
  profile.fetch
    cache: true
    success: (profile) ->
      res.locals.sd.PROFILE = profile.toJSON()
      success(profile)
    error: next

@index = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    res.render 'templates',
      profile : profile

@posts = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.get('posts_count')
      res.render 'templates',
        profile : profile
    else
      res.redirect profile.href()

@favorites = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    res.render 'templates',
      profile : profile
