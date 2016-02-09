Backbone = require 'backbone'

@index = (req, res) ->
  res.render 'index',

@redirectArtwork = (req, res) ->
  res.redirect 301, req.url.replace 'artwork', 'browse'

@redirectArtworks = (req, res) ->
  res.redirect 301, req.url.replace 'artworks', 'browse'
