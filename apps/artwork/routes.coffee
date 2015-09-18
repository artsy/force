Q = require 'bluebird-q'
Artwork = require '../../models/artwork'
Artist = require '../../models/artist'
Artists = require '../../collections/artists'
Backbone = require 'backbone'
defaultMessage = require '../../components/contact/default_message.coffee'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ client } = require '../../lib/cache'
request = require 'superagent'
{ FUSION_URL } = require '../../config'

@index = (req, res, next) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch
    cache: not FUSION_URL?
    error: res.backboneError
    success: (model, response, options) ->
      # Remove the current artwork tab from the path to more easily test against artwork.href()
      artworkPath = res.locals.sd.CURRENT_PATH
      artworkPath = artworkPath.replace("/#{req.params.tab}", '') if req.params?.tab

      return res.redirect artwork.href() if artworkPath isnt artwork.href()

      artist = new Artist artwork.get('artist')
      artists = new Artists artwork.get('artists')

      Q.all(artists.invoke('fetch', cache: true)).then ->
        artist = artists.get artist.id if artists.length

        res.locals.sd.ARTWORK = artwork.toJSON()
        res.locals.sd.ARTISTS = artists.toJSON()
        res.locals.sd.ARTIST = artist.toJSON()

        res.render 'index',
          artwork: artwork
          artist: artist
          artists: artists
          tab: req.params.tab
          auctionId: req.query?.auction_id
          jsonLD: stringifyJSONForWeb(artwork.toJSONLD())
          defaultMessage: defaultMessage(artwork, artwork.related().partner)
          # HACK: Hide auction results for ADAA
          inADAA: req.query.fair_id is 'adaa-the-art-show-2015'
      , ->
        err = new Error 'Not Found'
        err.status = 404
        next err

@save = (req, res) ->
  return res.redirect "/artwork/#{req.params.id}" unless req.user
  req.user.initializeDefaultArtworkCollection()
  req.user.defaultArtworkCollection().saveArtwork req.params.id,
    data: { access_token: req.user.get('accessToken') }
    error: res.backboneError
    success: ->
      res.redirect "/artwork/#{req.params.id}"

@download = (req, res, next) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch cache: true, success: ->
    if artwork.isDownloadable(req.user)
      imageRequest = request.get(artwork.downloadableUrl req.user)
      imageRequest.set('X-ACCESS-TOKEN': req.user.get('accessToken')) if req.user
      req.pipe(imageRequest).pipe res
    else
      res.status 403
      next new Error 'Not authorized to download this image'
