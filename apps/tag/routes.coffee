Tag = require '../../models/tag'

@index = (req, res, next) ->
  new Tag(id: req.params.id).fetch
    success: (tag) ->
      res.locals.sharify.data.TAG = tag.toJSON()
      res.render 'index', tag: tag
    error: res.backboneError