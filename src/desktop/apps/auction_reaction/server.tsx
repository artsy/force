import express from "express"
import {
  bidderRegistration,
  auctionFAQRoute,
  confirmBidRoute,
  confirmBidRouteOverride,
} from "./routes"

export const app = express()

app.get("/auction-faq", auctionFAQRoute)
app.get("/auction-registration/:auctionID", bidderRegistration)
app.get("/auction-registration2/:auctionID*", bidderRegistration)
app.get("/auction/:auctionID/bid/:artworkID", confirmBidRouteOverride)
app.get("/auction/:auctionID/bid2/:artworkID", confirmBidRoute)
