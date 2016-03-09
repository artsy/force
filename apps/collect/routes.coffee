Backbone = require 'backbone'
JSONPage = require '../../components/json_page'
page = new JSONPage name: 'browse-categories'

@index = (req, res) ->
  page.get (err, data) ->
    return next err if err
    res.locals.sd.CATEGORIES = data
    res.render 'index'

@redirectArtwork = (req, res) ->
  res.redirect 301, req.url.replace 'artwork', 'browse'

@redirectArtworks = (req, res) ->
  res.redirect 301, req.url.replace 'artworks', 'browse'

@categories = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.render 'categories',
      categoryMap: page.data
      hasResults: -> true
