_ = require 'underscore'
Q = require 'q'
{ API_URL } = require('sharify').data
Sales = require '../../collections/sales'
Artworks = require '../../collections/artworks'

elligibleFilter = _.partial _.filter, _, ((sale) ->
  # Reject sales without artworks
  sale.get('eligible_sale_artworks_count') isnt 0)

@index = (req, res) ->
  sales = new Sales
  sales.comparator = (sale) -> -(Date.parse(sale.get 'end_at'))
  sales.fetch
    cache: true
    data: is_auction: true, published: true, size: 20, sort: '-created_at'
    success: (collection, response, options) ->
      # Fetch artworks for the sale
      Q.allSettled(sales.map (sale) ->
        sale.related().saleArtworks.fetch
          cache: true
          data: size: 5, sort: 'position'
          success: (collection, response, options) ->
            sale.related().artworks.reset(Artworks.fromSale(collection).models, parse: true)
      ).then(->
        { closed, open, preview } = sales.groupBy 'auction_state'

        open = elligibleFilter(open) or []
        closed = elligibleFilter(closed) or []

        res.locals.sd.CURRENT_AUCTIONS = open
        res.locals.sd.ARTWORK_DIMENSIONS = _.map open.concat(closed), (auction) ->
          id: auction.id, dimensions: auction.related().artworks.fillwidthDimensions(260)

        res.render 'index',
          pastAuctions: closed
          currentAuctions: open
          upcomingAuctions: preview or []
      ).done()
