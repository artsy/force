_ = require 'underscore'
{ NODE_ENV, APPLICATION_NAME, API_URL } = require('sharify').data
Artwork = require '../../models/artwork'
map = require '../../components/inquiry_questionnaire/map.coffee'

@index = (req, res) ->
  artwork = new Artwork id: req.query.artwork_id or
    'cindy-sherman-untitled-as-marilyn-monroe'
  artwork.fetch cache: true, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()

    res.render 'index',
      artwork: artwork
      views: _.keys map.views
      NODE_ENV: NODE_ENV
      APPLICATION_NAME: APPLICATION_NAME
      API_URL: API_URL
