{ NODE_ENV, APPLICATION_NAME, API_URL } = require('sharify').data
Artwork = require '../../models/artwork'

@index = (req, res) ->
  artwork = new Artwork id: 'cindy-sherman-untitled-as-marilyn-monroe'

  artwork.fetch cache: true, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()

    res.render 'index',
      NODE_ENV: NODE_ENV
      APPLICATION_NAME: APPLICATION_NAME
      API_URL: API_URL
