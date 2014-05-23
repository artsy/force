Artwork   = require '../../models/artwork'
Artist    = require '../../models/artist'
Backbone  = require 'backbone'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'

@index = (req, res) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch
    cache   : true
    error   : res.backboneError
    success : (model, response, options) ->
      # Remove the current artwork tab from the path to more easily test against artwork.href()
      artworkPath = res.locals.sd.CURRENT_PATH
      if req.params?.tab
        artworkPath = artworkPath.replace("/#{req.params.tab}", '')

      if artworkPath == artwork.href()
        res.locals.sd.ARTWORK = response
        if artwork.get('artist')
          artist = new Artist artwork.get('artist')
          artist.fetch
            cache   : true
            error   : res.backboneError
            success : (model, response, options) ->
              res.locals.sd.ARTIST = response
              res.render 'index',
                artwork: artwork
                artist : artist
                tab    : req.params.tab
                jsonLD : stringifyJSONForWeb(artwork.toJSONLD())
        else
          res.render 'index',
            artwork: artwork
            jsonLD : stringifyJSONForWeb(artwork.toJSONLD())
      else
        res.redirect artwork.href()

@save = (req, res) ->
  return res.redirect "/artwork/#{req.params.id}" unless req.user
  req.user.initializeDefaultArtworkCollection()
  req.user.defaultArtworkCollection().saveArtwork req.params.id,
    data: { access_token: req.user.get('accessToken') }
    error: res.backboneError
    success: ->
      res.redirect "/artwork/#{req.params.id}"
