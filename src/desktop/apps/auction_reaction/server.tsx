import express from "express"
import { skipIfClientSideRoutingEnabled } from "desktop/components/split_test/skipIfClientSideRoutingEnabled"
import { bidderRegistration, auctionFAQRoute, confirmBidRoute } from "./routes"

export const app = express()

app.get("/auction-faq", skipIfClientSideRoutingEnabled, auctionFAQRoute)
app.get(
  "/auction-registration/:auctionID",
  skipIfClientSideRoutingEnabled,
  bidderRegistration
)
app.get(
  "/auction-registration2/:auctionID*",
  skipIfClientSideRoutingEnabled,
  bidderRegistration
)
app.get(
  "/auction/:auctionID/bid/:artworkID",
  skipIfClientSideRoutingEnabled,
  confirmBidRoute
)
