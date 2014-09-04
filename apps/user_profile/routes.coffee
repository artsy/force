{ ArtworkCollection } = ArtworkCollections = require '../../collections/artwork_collections.coffee'

@index = (req, res, next) ->
  return next() unless res.locals.profile?.isUser()
  if res.locals.tab
    res.locals.sd.INCLUDE_ESCAPED_FRAGMENT = false
  res.render 'index'

@collection = (req, res, next) ->
  unless profile = res.locals.profile
    err = new Error "Profile not found."
    err.status = 404
    return next err
  data = { private: true }
  data.access_token = req.user.get('accessToken') if req.user
  new ArtworkCollection(id: req.params.id, user_id: profile.get('owner').id).fetch
    data: data
    error: res.backboneError
    success: (collection) ->
      res.locals.sd.COLLECTION = collection.toJSON()
      res.locals.sd.PROFILE = profile.toJSON()
      res.render 'collection',
        collection: collection
        profile: profile
