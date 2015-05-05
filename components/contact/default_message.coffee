module.exports = (artwork, partner) ->
  switch partner?.get('type')
    when 'Auction'
      'Hello, I am interested in placing a bid on this work. ' +
      'Please send me more information.'
    else
      if artwork.isPriceDisplayable()
        "I'm interested in this work" +
        (if artwork.has('artist') then ' by ' + artwork.related().artist.get('name') else '') +
        ". Please contact me to discuss further."
      else
        "Hi. Could you please share the asking price for this work? I'd like to know if it's within my budget."