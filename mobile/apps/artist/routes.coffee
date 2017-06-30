Artist = require '../../models/artist'
metaphysics = require '../../../lib/metaphysics'
Q = require 'bluebird-q'

query = """
  query artist($id: String!) {
    artist(id: $id) {
      name
      id
      hometown
      years
      biography_blurb(format: HTML) {
        text
        credit
      }
    }
  }

"""

shouldDisplayAppBanner = (req) ->
  userAgent = req.headers['user-agent']
  dismissedAppBanner = req.cookies['dismissed-app-banner'] || false
  
  userAgent.match(/iPhone/i) and
    not userAgent.match('Artsy-Mobile') and
    not dismissedAppBanner

module.exports.index = (req, res, next) ->
  artist = new Artist id: req.params.id
  Q.all([
    artist.fetch(cache: true)
    artist.maybeFetchAndSetFeaturedBio()
    artist.fetchArtworks(data: {size: 50})
  ]).then ([artistData, partnerArtists, artworks]) ->
    res.locals.sd.APP_BANNER_MODAL =
      slug: 'artist'
      copy: "Be the first to know when works by #{artist.get('name')} are available."
      image: artist.get('image_urls')?.square
      link: "https://itunes.apple.com/app/id703796080?mt=8"
    res.locals.sd.SHOULD_DISPLAY_APP_BANNER = shouldDisplayAppBanner(req)
    res.locals.sd.ARTIST = artistData
    res.locals.sd.ARTWORKS = artworks
    showAuctionLink = artist.get('display_auction_link')
    res.render 'page', artist: artist, sort: req.query?.sort, showAuctionLink: showAuctionLink
  .catch (error) ->
    next()

module.exports.biography = (req, res, next) ->
  metaphysics query: query, variables: req.params, req: req
    .then (data) ->
      res.locals.sd.ARTIST = data.artist
      res.render 'biography', artist: data.artist
    .catch next

module.exports.auctionResults = (req, res, next) ->
  artist = new Artist id: req.params.id
  artist.fetch
    error: res.backboneError
    cache: true
    success: ->
      artist.fetchAuctionResults
        data: access_token: req.user?.get('accessToken')
        error: res.backboneError
        cache: true
        success: (results, resp, opts) ->
          totalCount = opts.res?.headers?['x-total-count']
          res.locals.sd.ARTIST = artist.toJSON()
          res.render 'auction_results',
            auctionResults: results.models
            artist: artist
            sort: req.query?.sort
            totalCount: totalCount
