Post     = require '../../models/post.coffee'
Profile  = require '../../models/profile.coffee'

render = (res, post, profile) ->
  if post
    res.locals.sd.POST = post.toJSON()
  if profile
    res.locals.sd.PROFILE = profile.toJSON()

  res.render 'templates/index',
    post    : post
    profile : profile

@index = (req, res) ->
  new Post(id: req.params.id).fetch
    error  : res.backboneError
    success: (post) ->
      if post.href() == req.originalUrl
        if post.get('profile')?.id
          profile = new Profile { id: post.get('profile').id }
          profile.fetch
            cache: true
            error: ->
              render res, post
            success: (profile) ->
              render res, post, profile
        else
          render res, post
      else
        res.redirect post.href()
