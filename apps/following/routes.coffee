_ = require 'underscore'
Backbone = require 'backbone'
Artists = require '../../collections/artists.coffee'

@index = (req, res, next) ->
  next()

@following = (req, res, next) ->
  return res.redirect("/") unless req.user
  itemsPerPage = 5
  if (type = req.params.type) is 'artists'
    req.user.followingArtists
      success: (data) ->
        artists = _.map data.toJSON(), (a) -> a.artist
        res.locals.sd.FOLLOWING_ARTISTS = artists
        res.locals.sd.ITEMS_PER_PAGE = itemsPerPage
        res.render 'index', { type: 'artists', items: artists, itemsPerPage: itemsPerPage}
      error: res.backboneError
  else if type is 'genes'
    req.user.followingGenes
      success: (data) ->
        genes = _.map data.toJSON(), (g) -> g.gene
        res.locals.sd.FOLLOWING_GENES = genes
        res.render 'index', { type: 'genes', items: genes }
      error: res.backboneError
  else
    next()

@favorites = (req, res) ->
  return res.redirect("/") unless req.user
  # TODO Render user's favorites page
