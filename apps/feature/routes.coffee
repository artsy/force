Feature = require '../../models/feature.coffee'

@index = (req, res) ->
  new Feature(id: req.params.id).fetch
    cache  : true
    error  : res.backboneError
    success: (feature) ->
      res.render 'template',
        feature: feature
