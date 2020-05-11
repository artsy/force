Feature = require '../../models/feature.coffee'

@index = (req, res, next) ->
  new Feature(id: req.params.id).fetch
    error: res.backboneError
    success: (feature) ->
      if feature.has('version') && feature.get('version') > 1
        next()
      else
        res.locals.sd.FEATURE = feature
        res.locals.sd.TAB = req.params.tab
        res.render 'templates/index',
          feature: feature

@redirectCityGuide = (req, res) ->
  res.redirect 301, 'https://iphone.artsy.net'
