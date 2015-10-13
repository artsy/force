{ NODE_ENV, APPLICATION_NAME, API_URL } = require('sharify').data
Artwork = require '../../models/artwork'
map = require '../../components/inquiry_questionnaire/map'

@index = (req, res, next) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch cache: true, error: next, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()
    res.render 'index', artwork: artwork

@development = (req, res, next) ->
  artwork = new Artwork id: req.query.artwork_id or
    'cindy-sherman-untitled-as-marilyn-monroe'

  artwork.fetch cache: true, error: next, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()

    res.render 'development',
      artwork: artwork
      views: Object.keys map.views
      NODE_ENV: NODE_ENV
      APPLICATION_NAME: APPLICATION_NAME
      API_URL: API_URL
      HAS_SEEN: req.cookies['inquiry-questionnaire-log']
