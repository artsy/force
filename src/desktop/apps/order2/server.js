import express from "express"
import { checkoutFlow } from "desktop/apps/order2/routes"

export const app = express()

app.get("/orders/:orderID*", checkoutFlow)
app.get("/order2/:orderID*", checkoutFlow)
