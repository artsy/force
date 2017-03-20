//
// Criteo tracking for auctions product feed and artworks product feed.
//

window.criteo_q = window.criteo_q || []
var pathSplit = location.pathname.split("/")
var userEmail = function() {
  return sd.CURRENT_USER ? [sd.CURRENT_USER.email] : [];
}()
if (pathSplit[1] === "auctions") {
  // http://www.artsy.net/auctions - (AUCTIONS viewHome)
  //              0          1
  window.criteo_q.push(
    { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
    { event: "setSiteType", type: "m" },
    { event: "viewHome" }
  )
} else if (pathSplit[1] === "auction") {
  if (!pathSplit[3]) {
    // https://www.artsy.net/auction/:auction_id - (AUCTIONS viewList)
    //              0          1          2
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "m" },
      { event: "viewList", item: sd.ARTWORKS.map(function(a) { return a._id }) }
    )
  } else if (pathSplit[3] === "bid") {
    // https://www.artsy.net/auction/:auction_id/bid - (AUCTIONS trackTransaction)
    //              0          1          2       3
    analyticsHooks.on("confirm:bid", function(bidderPosition) {
      var price = bidderPosition.get("max_bid_amount_cents") ? bidderPosition.get("max_bid_amount_cents") / 100 : null;
      window.criteo_q.push(
        { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
        { event: "setSiteType", type: "m" },
        {
          event: "trackTransaction",
          id: bidderPosition.get("bidder").id,
          item: [
            {
              id: bidderPosition.get("sale_artwork").artwork.id,
              price: price,
              quantity: 1
            }
          ]
        }
      )
    });
  }
} else if (pathSplit[1] === "artwork" && !pathSplit[3]) {
  // https://www.artsy.net/artwork/:artwork_id - (AUCTIONS & ARTWORKS viewItem)
  //              0          1          2
  if (sd.AUCTION && sd.AUCTION.artwork_id) {
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "m" },
      { event: "viewItem", item: sd.AUCTION && sd.AUCTION.artwork_id }
    )
  } else {
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "m" },
      { event: "setEmail", email: userEmail },
      { event: "viewItem", item: sd.ARTWORK._id }
    )
  }
} else {
  if (pathSplit[1] === "collect") {
    // https://www.artsy.net/collect - (ARTWORKS viewHome)
    //              0          1
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "m" },
      { event: "setEmail", email: userEmail },
      { event: "viewHome" }
    )
  } else if (pathSplit[1] === "artist" && !pathSplit[3]) {
    // https://www.artsy.net/artist/:artist_id - (ARTWORKS viewList)
    //              0          1         2
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "m" },
      { event: "setEmail", email: userEmail },
      { event: "viewList", item: _.pluck(_.filter(sd.ARTWORKS, function(a) { return a.availability === 'for sale' }), '_id') }
    )
  }
}
