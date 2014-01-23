Profile = require '../../models/profile'

@index = (req, res) ->
  profile = new Profile { id: req.params.id }
  profile.fetch
    cache: true
    success: (profile) ->
      res.locals.sd.PROFILE = profile.toJSON()
      res.render 'template',
        profile : profile
