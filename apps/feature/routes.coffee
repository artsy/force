Feature = require '../../models/feature.coffee'

@index = (req, res) ->
  new Feature(id: req.params.id).fetch
    cache  : true
    error  : res.backboneError
    success: (feature) ->
      res.locals.sd.FEATURE = JSON.stringify feature
      res.render 'template',
        feature: feature
