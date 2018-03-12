_ = require 'underscore'
Q = require 'bluebird-q'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'
Sales = require '../../collections/sales'
Artworks = require '../../collections/artworks'

eligibleFilter = _.partial _.filter, _, ((sale) ->
  # Reject sales without artworks
  sale.get('eligible_sale_artworks_count') isnt 0)

module.exports.index = (req, res) ->
  sales = new Sales
  sales.fetch
    cache: true
    data: is_auction: true, published: true, size: 100, sort: '-timely_at,name'
    success: (collection, response, options) ->
      # Fetch artworks for the sale
      Q.allSettled(sales.map (sale) ->
        sale.related().saleArtworks.fetch
          cache: true
          data: size: 5
          success: (collection, response, options) ->
            sale.related().artworks.reset(Artworks.fromSale(collection).models, parse: true)
      ).then(->
        { closed, open, preview } = sales.groupBy 'auction_state'

        open = eligibleFilter(open) or []
        closed = eligibleFilter(closed) or []

        sortedOpen = _.sortBy(open, (auction) -> Date.parse auction.sortableDate())

        res.locals.sd.CURRENT_AUCTIONS = sortedOpen
        res.locals.sd.PAST_AUCTIONS = closed
        res.locals.sd.UPCOMING_AUCTIONS = preview
        res.locals.sd.ARTWORK_DIMENSIONS = _.map sortedOpen.concat(closed), (auction) ->
          id: auction.id, dimensions: auction.related().artworks.fillwidthDimensions(260)

        preview = preview || []

        res.render 'index',
          navItems: [
            { name: 'Current', hasItems: sortedOpen.length },
            { name: 'Upcoming', hasItems: preview.length },
            { name: 'Past', hasItems: closed.length }
          ]
          emptyMessage: "Past Auctions"
          extraClasses: "auction-tabs"
          pastAuctions: closed
          currentAuctions: sortedOpen
          upcomingAuctions: preview
      ).done()
