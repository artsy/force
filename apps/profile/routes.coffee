Profile = require '../../models/profile'

fetchProfile = (req, res, success) ->
  profile = new Profile { id: req.params.id }
  profile.fetch
    cache: true
    success: (profile) ->
      res.locals.sd.PROFILE = profile.toJSON()
      success(profile)
    error: res.backboneError

@index = (req, res) ->
  fetchProfile req, res, (profile) ->
    res.render 'templates',
      profile : profile

@posts = (req, res) ->
  fetchProfile req, res, (profile) ->
    if profile.get('posts_count')
      res.render 'templates',
        profile : profile
    else
      res.redirect profile.href()

@favorites = (req, res) ->
  res.render 'templates'
