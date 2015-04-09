Artwork = require '../../models/artwork'
Artist = require '../../models/artist'
Backbone = require 'backbone'
defaultMessage = require '../../components/contact/default_message.coffee'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ client } = require '../../lib/cache'
request = require 'superagent'

@index = (req, res) ->
  template = if req.query.modal? then 'modal' else 'index'

  artwork = new Artwork id: req.params.id
  artwork.fetch
    cache: true
    error: res.backboneError
    success: (model, response, options) ->
      # Remove the current artwork tab from the path to more easily test against artwork.href()
      artworkPath = res.locals.sd.CURRENT_PATH
      if req.params?.tab
        artworkPath = artworkPath.replace("/#{req.params.tab}", '')

      if artworkPath == artwork.href()
        res.locals.sd.ARTWORK = response
        if artwork.get('artist')
          artist = new Artist artwork.get('artist')
          artist.fetch
            cache: true
            error: res.backboneError
            success: (model, response, options) ->
              res.locals.sd.ARTIST = response

              if res.locals.sd.INQUIRY_FLOW is 'updated_flow'
                if artwork.isPriceDisplayable()
                  message = "I'm interested in this work" + ( if artwork.has('artist') then ' by ' + artwork.related().artist.get('name') else '') + ". Please contact me to discuss further."
                else
                  message = "Hi. Could you please share the asking price for this work? I'd like to know if it's within my budget."
              else
                message = defaultMessage(artwork)

              res.render template,
                artwork: artwork
                artist: artist
                tab: req.params.tab
                auctionId: req.query?.auction_id
                jsonLD: stringifyJSONForWeb(artwork.toJSONLD())
                defaultMessage: message
                # HACK: Hide auction results for ADAA
                inADAA: req.query.fair_id is 'adaa-the-art-show-2015'
        else
          res.render 'index',
            artwork: artwork
            tab: req.params.tab
            auctionId: req.query?.auction_id
            jsonLD: stringifyJSONForWeb(artwork.toJSONLD())
            defaultMessage: defaultMessage(artwork)
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
