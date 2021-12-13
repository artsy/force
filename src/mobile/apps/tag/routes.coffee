{ Tag } = require '../../models/tag'

module.exports.index = (req, res, next) ->
  tag = new Tag id: req.params.id
  tag.fetch
    cache: true
    success: ->
      res.locals.sd.TAG = tag.toJSON()
      res.locals.sd.PARAMS = req.query
      res.render 'index', tag: tag
     error: res.backboneError
