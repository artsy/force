import express from "express"
import { auctionFAQRoute, bidderRegistration, confirmBidRoute } from "./routes"

export const app = express()

app.get("/auction-faq", auctionFAQRoute)
app.get("/auction-registration/:auctionID", bidderRegistration)
app.get("/auction-registration2/:auctionID*", bidderRegistration)
app.get("/auction/:auctionID/bid/:artworkID", confirmBidRoute)
