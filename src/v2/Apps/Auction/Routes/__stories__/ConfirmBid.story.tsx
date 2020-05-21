import { routes as auctionRoutes } from "v2/Apps/Auction/routes"
import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

/**
 * The `artworkId` needs to be changed on a weekly basis due to the re-creation
 * of the `shared-live-mocktion` auction. The sale slug should stay consistent
 * from week to week.
 *
 * When in doubt, you can always create a new mocktion
 * (https://joe.artsy.net/job/gravity-staging-create-auction-on-demand/) and
 * set these values to the sale and an artwork created in the auction
 */

const auctionId = "shared-live-mocktion"
const artworkId = "joseph-lorusso-transcendence"
const confirmBidRoute = `/auction/${auctionId}/bid/${artworkId}`

storiesOf("Apps/Auction/Routes/Confirm Bid", module)
  .add("Plain", () => {
    return <MockRouter routes={auctionRoutes} initialRoute={confirmBidRoute} />
  })
  .add("Selected bid in query string", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute={confirmBidRoute + "?bid=110000000000"}
      />
    )
  })
