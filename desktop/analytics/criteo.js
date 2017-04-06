//
// Criteo tracking for auctions product feed and artworks product feed
//
window.criteo_q = window.criteo_q || []
var pathSplit = location.pathname.split('/')
var userEmail = function() {
  return sd.CURRENT_USER ? [sd.CURRENT_USER.email] : [];
}()
if (pathSplit[1] === 'auctions') {
  // http://www.artsy.net/auctions - (AUCTIONS viewHome)
  //              0          1
  window.criteo_q.push(
    { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
    { event: 'setSiteType', type: 'd' },
    { event: 'viewHome' }
  )
} else if (pathSplit[1] === 'auction') {
  if (!pathSplit[3]) {
    // https://www.artsy.net/auction/:auction_id - (AUCTIONS viewList)
    //              0          1          2
    analyticsHooks.on('auction:artworks:loaded', function(artworks) {
      window.criteo_q.push(
        { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
        { event: 'setSiteType', type: 'd' },
        { event: 'viewList', item: artworks }
      )
    })
  } else if (pathSplit[3] === 'bid') {
    // https://www.artsy.net/auction/:auction_id/bid - (AUCTIONS trackTransaction)
    //              0          1          2       3
    analyticsHooks.on('confirm:bid:form:success', function(data) {
      const price = data.max_bid_amount_cents ? data.max_bid_amount_cents / 100 : null
      window.criteo_q.push(
        { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
        { event: 'setSiteType', type: 'd' },
        {
          event: 'trackTransaction',
          id: data.bidder_position_id,
          item: [
            {
              id: sd.SALE_ARTWORK.artwork._id,
              price: price,
              quantity: 1
            }
          ]
        }
      )
    })
  }
} else if (pathSplit[1] === 'artwork' && !pathSplit[3]) {
  // https://www.artsy.net/artwork/:artwork_id - (AUCTIONS & ARTWORKS viewItem)
  //              0          1          2
  //
  // We cannot send both ids on product pages, so, send the Auctions account ID
  // if the artwork is in an auction, otherwise send the Artworks account ID.
  if (sd.AUCTION && sd.AUCTION.artwork_id) {
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "m" },
      { event: "viewItem", item: sd.AUCTION && sd.AUCTION.artwork_id }
    )
  } else {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'setEmail', email: userEmail },
      { event: 'viewItem', item: sd.COMMERCIAL.artwork._id }
    )
  }
  // ARTWORKS viewBasket
  analyticsHooks.on('inquiry_questionnaire:modal:opened', function(data) {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'setEmail', email: userEmail },
      {
        event: 'viewBasket',
        item: [
          {
            id: sd.COMMERCIAL.artwork._id,
            price: sd.COMMERCIAL.artwork.price,
            quantity: 1
          }
        ]
      }
    )
  })
  // ARTWORKS trackTransaction
  analyticsHooks.on('inquiry_questionnaire:inquiry:sync', function(data) {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'setEmail', email: userEmail },
      {
        event: 'trackTransaction',
        id: data.inquiry.id,
        item: [
          {
            id: sd.COMMERCIAL.artwork._id,
            price: sd.COMMERCIAL.artwork.price,
            quantity: 1
          }
        ]
      }
    )
  })
} else {
  if (pathSplit[1] === 'collect') {
    // https://www.artsy.net/collect - (ARTWORKS viewHome)
    //              0          1
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'setEmail', email: userEmail },
      { event: 'viewHome' }
    )
  } else if (pathSplit[1] === 'artist' && !pathSplit[3]) {
    // https://www.artsy.net/artist/:artist_id - (ARTWORKS viewList)
    //              0          1         2
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'setEmail', email: userEmail },
      { event: 'viewList', item: _.pluck(sd.ARTIST._artworks, '_id') }
    )
  }
}
