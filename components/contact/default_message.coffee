module.exports = (artwork) ->
  message = 'Hello, I’m interested in this work'
  message += " by #{artwork.get('artist').name}" if artwork.get('artist')
  message += ". Please confirm availability "
  message += 'and pricing ' unless artwork.isPriceDisplayable()
  message += 'of this work.'
