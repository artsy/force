_ = require 'underscore'
{ ARTWORK, CURRENT_USER } = require('sharify').data
CurrentUser = require '../../../../models/current_user'
metaphysics = require '../../../../../lib/metaphysics'
template = -> require('./templates/bid.jade') arguments...

query = """
  query artwork($id: String!, $sale_id: String!) {
    me {
      lot_standing(artwork_id: $id, sale_id: $sale_id) {
        is_leading_bidder
      }
    }
    artwork(id: $id) {
      #{require('./query')}
    }
  }
"""

module.exports = ->
  $el = $('.js-artwork-auction-container')
  return unless $el.length

  metaphysics
    query: query
    variables: id: ARTWORK.id, sale_id: ARTWORK.auction.id
    req: user: CurrentUser.orNull()

  .then ({ artwork, me }) ->
    $('.artwork-auction-bid-module__current-bid').html template artwork: artwork, bidder: me, _: _
