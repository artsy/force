Post = require '../../models/post.coffee'
Profile = require '../../models/profile.coffee'
{ API_URL } = require '../../config'

render = (res, post, profile) ->
  if post
    res.locals.sd.POST = post.toJSON()
  if profile
    res.locals.sd.PROFILE = profile.toJSON()

  res.render 'index',
    post: post
    profile: profile
    JSONLD: post.toJSONLD()

@index = (req, res) ->
  new Post(id: req.params.id).fetch
    error: res.backboneError
    success: (post) ->
      if post.href() == res.locals.sd.CURRENT_PATH
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

@post = (req, res, next) ->
  if req.user?.get('type') is 'Admin' or req.user?.get('has_partner_access')
    res.redirect API_URL + '/post'
  else
    res.render 'deprecated'
