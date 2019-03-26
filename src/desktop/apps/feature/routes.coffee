Feature = require '../../models/feature.coffee'

@index = (req, res) ->
  new Feature(id: req.params.id).fetch
    error: res.backboneError
    success: (feature) ->
      res.locals.sd.FEATURE = feature
      res.locals.sd.TAB = req.params.tab
      res.render 'templates/index',
        feature: feature

@redirectCityGuide = (req, res) ->
  res.redirect 301, 'https://iphone.artsy.net'
  