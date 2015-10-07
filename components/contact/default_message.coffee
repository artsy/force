module.exports = (artwork, partner) ->
  if partner?.get('type') is 'Auction'
    'Hello, I am interested in placing a bid on this work. ' +
    'Please send me more information.'
  else
    'Hi, I’m interested in purchasing this work. ' +
    'Could you please provide more information about the piece?'
