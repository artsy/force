{ extend } = require 'underscore'
qs = require 'qs'
get = require 'lodash.get'
metaphysics = require '../../../lib/metaphysics'
{ METAPHYSICS_ENDPOINT, CURRENT_USER } = require('sharify').data
helpers = require './helpers'

query = (user) -> """
  query artwork($id: String!) {
    artwork(id: $id) {
      id
      _id
      title
      medium
      date
      to_s
      is_sold
      is_inquireable
      is_acquireable
      availability
      sale_message
      price
      is_for_sale
      medium
      edition_of
      attribution_class {
        short_description
        long_description
      }
      image_rights
      collecting_institution
      cultural_maker
      context {
        __typename
        ... on ArtworkContextAuction {
          is_open
        }

        ... on ArtworkContextPartnerShow {
          is_active
        }
      }
      edition_sets {
        id
        is_acquireable
        edition_of
        price
        dimensions {
          in
          cm
        }
      }
      dimensions {
        in
        cm
      }
      image {
        url(version: "large")
        height
        width
      }
      images {
        url
        height
        width
        is_default
        deep_zoom {
          Image {
            xmlns
            Url
            Format
            TileSize
            Overlap
            Size {
              Width
              Height
            }
          }
        }
      }
      artist {
        name
        href
        counts {
          artworks
          partner_shows
        }
      }
      #{require('./components/bid/query.coffee')}
      #{require('./components/artist/query.coffee')}
      #{require('./components/partner/query.coffee')}
      #{require('./components/highlights/query.coffee')}
      #{require('./components/tabs/query.coffee')}
    }
  }
"""

meQuery = """
  query artwork($sale_id: String!) {
    me {
      bidders(sale_id: $sale_id) {
        qualified_for_bidding
      }
    }
  }
"""

module.exports.index = (req, res, next) ->
  send = query: query(req.user), variables: req.params, req: req

  if req.query.query?
    get = extend {}, send, variables: JSON.stringify send.variables
    return res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

  metaphysics send
    .then (data) ->
      res.locals.artwork = data.artwork
      res.locals.sd.ARTWORK = data.artwork
      res.locals.sd.SEADRAGON_URL = res.locals.asset('/assets/mobile_openseadragon.js')
      res.locals.helpers = helpers

      # If a saleId is found, then check to see if user has been qualified for
      # bidding so that bid button UI is correct from the server down.
      saleId = get(data, 'artwork.auction.id', false)

      if saleId
        fetchMeData(meQuery, req.user, saleId)
          .then (meData) ->
            res.render 'index', extend data, meData
          .catch next
      else
        res.render 'index', data
    .catch next

module.exports.askSpecialist = (req, res, next) ->
  send = query: query(), variables: req.params, req: req

  if req.query.query?
    get = extend {}, send, variables: JSON.stringify send.variables
    return res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

  metaphysics send
    .then (data) ->
      res.locals.artwork = data.artwork
      res.locals.sd.ARTWORK = data.artwork
      res.render 'ask_specialist_page'
    .catch next

# Helpers
fetchMeData = (query, user, saleId) ->
  new Promise (resolve, reject) ->
    metaphysics
      method: 'post'
      query: query,
      req:
        user: user
      variables:
        sale_id: saleId
    .then resolve
    .catch reject
