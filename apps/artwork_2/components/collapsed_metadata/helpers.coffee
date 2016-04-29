{ truncate } = require 'underscore.string'

module.exports =
  truncate: truncate

  isDisplayable: (artwork) ->
    artwork.is_contactable or
    artwork.sale and artwork.sale.is_auction and artwork.sale.is_open
