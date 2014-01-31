Feature = require '../../models/feature.coffee'

@index = (req, res) ->
  new Feature(id: req.params.id).fetch
    cache  : true
    error  : res.backboneError
    success: (feature) ->
      res.locals.sd.FEATURE = feature
      res.render 'templates/index',
        feature: feature
