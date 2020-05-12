Feature = require '../../models/feature'

module.exports.index = (req, res, next) ->
  new Feature(id: req.params.id).fetch
    cache: true
    success: (feature) ->
      if feature.has('version') && feature.get('version') > 1
        next()
      else
        res.locals.sd.FEATURE = feature.toJSON()
        res.render 'page', feature: feature
    error: res.backboneError