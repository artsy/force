HeroUnits = require '../../collections/hero_units'

@index = (req, res) ->
  new HeroUnits().fetch
    success: (heroUnits) -> res.render 'template', heroUnits: heroUnits.models
    error: -> res.render 'template', heroUnits: []