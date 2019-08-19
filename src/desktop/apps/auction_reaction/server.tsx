import express from "express"
import { bidderRegistration } from "./routes"

export const app = express()

app.get("/auction-registration2/:auctionID*", bidderRegistration)
