_ = require 'underscore'
Backbone = require 'backbone'
Artists = require '../../collections/artists.coffee'

@following = (req, res, next) ->
  return res.redirect("/") unless req.user
  itemsPerPage = 5

  if (type = req.params.type) in ['artists', 'genes']
    res.locals.sd.TYPE = type
    res.render 'index', type: type
  else
    next()

@favorites = (req, res) ->
  return res.redirect("/") unless req.user
  # TODO Render user's favorites page
