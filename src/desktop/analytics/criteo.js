//
// Criteo tracking for auctions product feed and artworks product feed
//
window.criteo_q = window.criteo_q || []
var pathSplit = location.pathname.split("/")
const pageType = window.sd.PAGE_TYPE || pathSplit[1]
var userEmail = (function() {
  return sd.CURRENT_USER ? [sd.CURRENT_USER.email] : []
})()
if (pageType === "auctions") {
  // http://www.artsy.net/auctions - (AUCTIONS viewHome)
  //              0          1
  window.criteo_q.push(
    { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
    { event: "setSiteType", type: "d" },
    { event: "viewHome" }
  )
} else if (pageType === "auction") {
  if (!pathSplit[3]) {
    // https://www.artsy.net/auction/:auction_id - (AUCTIONS viewList)
    //              0          1          2
    analyticsHooks.on("auction:artworks:loaded", function(artworks) {
      window.criteo_q.push(
        { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
        { event: "setSiteType", type: "d" },
        { event: "viewList", item: artworks }
      )
    })
  } else if (pathSplit[3] === "bid") {
    // https://www.artsy.net/auction/:auction_id/bid - (AUCTIONS trackTransaction)
    //              0          1          2       3
    analyticsHooks.on("confirm:bid:form:success", function(data) {
      const price = data.max_bid_amount_cents
        ? data.max_bid_amount_cents / 100
        : null
      window.criteo_q.push(
        { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
        { event: "setSiteType", type: "d" },
        {
          event: "trackTransaction",
          id: data.bidder_position_id,
          item: [
            {
              id: sd.SALE_ARTWORK.artwork._id,
              price: price,
              quantity: 1,
            },
          ],
        }
      )
    })
  }
} else {
  if (pageType === "collect") {
    // https://www.artsy.net/collect - (ARTWORKS viewHome)
    //              0          1
    window.criteo_q.push(
      { event: "setAccount", account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
      { event: "setSiteType", type: "d" },
      { event: "setEmail", email: userEmail },
      { event: "viewHome" }
    )
  }
}
