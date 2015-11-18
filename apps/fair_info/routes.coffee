Fair = require '../../models/fair'

@assignFair = (req, res, next) ->
  return next() unless res.locals.profile

  fair = new Fair id: res.locals.profile.get('owner').id
  fair.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.fair = fair
      res.locals.sd.FAIR = fair.toJSON()
      next()

@index = (req, res) ->
  res.render("index")

@visitors = (req, res) ->
  res.render("visitors")

@programming = (req, res) ->
  res.render("programming")