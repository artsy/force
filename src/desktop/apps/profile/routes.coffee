{ Profile } = require '../../models/profile'
Following = require '../../components/follow_button/collection.coffee'

@follow = (req, res) ->
  return res.redirect "/#{req.params.id}" unless req.user
  new Following(null, kind: 'profile').follow req.params.id,
    access_token: req.user.get('accessToken')
    error: res.backboneError
    success: -> res.redirect "/#{req.params.id}"

@setProfile = (req, res, next) ->
  return next() if req.params.id is 'assets'
  data = {}
  data.access_token = req.user.get('accessToken') if req.user
  return next() if res.locals.profile
  new Profile(id: req.params.id).fetch
    data: data
    success: (profile) ->
      res.locals.profile = profile
      res.locals.sd.PROFILE = profile.toJSON()
      res.locals.jsonLD = profile.toJSONLD()
      res.locals.tab = req.params.tab
    complete: -> next()

@redirectEditorial = (req, res, next) ->
  res.redirect 301, req.url.replace 'editorial', 'articles'
