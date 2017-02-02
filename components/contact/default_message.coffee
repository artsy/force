module.exports = (artwork, partner) ->
  if partner?.get('type') is 'Auction'
    'Hello, I am interested in placing a bid on this work. ' +
    'Please send me more information.'
  else
    if artwork.get('availability') is 'sold'
      'Hi, I’m interested in similar works by this artist. ' +
      'Could you please let me know if you have anything available?'
    else if artwork.get('availability') isnt 'not for sale'
      'Hi, I’m interested in purchasing this work. ' +
      'Could you please provide more information about the piece?'
