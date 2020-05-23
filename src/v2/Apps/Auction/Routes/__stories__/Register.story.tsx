import { routes as auctionRoutes } from "v2/Apps/Auction/routes"
import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Auction/Routes", module).add("Register", () => {
  return (
    <MockRouter
      routes={auctionRoutes}
      initialRoute="/auction-registration/devon-repro-auct-726"
    />
  )
})
