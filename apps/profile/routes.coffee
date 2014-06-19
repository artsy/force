Profile = require '../../models/profile'
Following = require '../../components/follow_button/collection.coffee'

@follow = (req, res) ->
  return res.redirect "/#{req.params.id}" unless req.user
  new Following(null, kind: 'profile').follow req.params.id,
    access_token: req.user.get('accessToken')
    error: res.backboneError
    success: -> res.redirect "/#{req.params.id}"

@setProfile = (req, res, next) ->
  new Profile(id: req.params.id).fetch
    data:
      access_token: req.user?.get('accessToken')
    success: (profile) ->
      res.locals.profile = profile
      res.locals.sd.PROFILE = profile.toJSON()
      res.locals.jsonLD = profile.toJSONLD()
      res.locals.tab = req.params.tab
    complete: -> next()
