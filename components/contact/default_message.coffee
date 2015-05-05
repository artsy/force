module.exports = (artwork, partner) ->
  switch partner?.get('type')
    when 'Auction'
      'Hello, I am interested in placing a bid on this work. ' +
      'Please send me more information.'
    else
      message = 'I’m interested in this work'
      message += " by #{artwork.related().artist.get('name')}" if artwork.has('artist')
      message += '. Could you please confirm its availability'
      message += ' and price' unless artwork.isPriceDisplayable()
      message += '? Thank you.'
