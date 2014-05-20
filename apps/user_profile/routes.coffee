{ ArtworkCollection } = ArtworkCollections = require '../../collections/artwork_collections.coffee'

@index = (req, res, next) ->
  return next() unless res.locals.profile?.isUser()
  res.render 'index'

@collection = (req, res) ->
  profile = res.locals.profile
  new ArtworkCollection(id: req.params.id, user_id: profile.get('owner').id).fetch
    error: res.backboneError
    success: (collection) ->
      res.locals.sd.COLLECTION = collection.toJSON()
      res.locals.sd.PROFILE = profile.toJSON()
      res.render 'collection',
        collection: collection
        profile: profile