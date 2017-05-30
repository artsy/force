_ = require 'underscore'
{ ARTWORK, CURRENT_USER } = require('sharify').data
CurrentUser = require '../../../../models/current_user.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
helpers = require '../../helpers.coffee'
template = -> require('./templates/bid.jade') arguments...

query = """
  query artwork($id: String!, $sale_id: String!) {
    me {
      bidders(sale_id: $sale_id) {
        qualified_for_bidding
      }
      lot_standing(artwork_id: $id, sale_id: $sale_id) {
        is_leading_bidder
      }
    }
    artwork(id: $id) {
      #{require('./query.coffee')}
    }
  }
"""

module.exports = ->
  $el = $('.js-artwork-auction-container')
  return unless $el.length

  metaphysics
    query: query
    variables:
      id: ARTWORK.id,
      sale_id: ARTWORK.auction.id
    req: user: CurrentUser.orNull()

  .then ({ artwork, me }) ->
    $('.artwork-auction-bid-module__current-bid').html template _.extend {},
      artwork: artwork,
      bidder: me,
      helpers: helpers,
      user: CURRENT_USER?
      _: _
