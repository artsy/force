import express from "express"
import { checkoutFlow } from "desktop/apps/order/routes"

export const app = express()

app.get("/orders/:orderID*", checkoutFlow)
