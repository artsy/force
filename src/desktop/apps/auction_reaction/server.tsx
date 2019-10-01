import express from "express"
import { bidderRegistration, auctionFAQRoute } from "./routes"

export const app = express()

app.get("/auction-faq", auctionFAQRoute)
app.get("/auction-registration/:auctionID", bidderRegistration)
app.get("/auction-registration2/:auctionID*", bidderRegistration)
