Fair = require '../../models/fair'
Profile = require '../../models/profile'

@assignFair = (req, res, next) ->
  res.locals.fair = res.locals.profile?.related().owner
  next()

@index = (req, res) ->
  res.render("index")

@visitors = (req, res) ->
  res.render("visitors")
