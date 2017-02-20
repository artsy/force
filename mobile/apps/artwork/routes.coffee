{ extend } = require 'underscore'
qs = require 'qs'
metaphysics = require '../../lib/metaphysics'
{ METAPHYSICS_ENDPOINT, CURRENT_USER } = require('sharify').data
Helpers = require './helpers'

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
      res.locals.helpers = Helpers
      res.render 'index'
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
