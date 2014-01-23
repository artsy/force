Post    = require '../../models/post'
Profile = require '../../models/profile'

@index = (req, res) ->
  new Post(id: req.params.id).fetch
    error  : res.backboneError
    success: (post) ->
      profile = new Profile { id: post.get('author').default_profile_id }
      profile.fetch
        cache: true
        success: (profile) ->
          res.locals.sd.POST = post.toJSON()
          res.locals.sd.PROFILE = profile.toJSON()
          res.render 'template',
            post    : post
            profile : profile
