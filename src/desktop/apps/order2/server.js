import express from "express"
import { checkoutFlow } from "desktop/apps/order2/routes"

const app = (module.exports = express())

app.get("/orders/:orderID*", checkoutFlow)
app.get("/order2/:orderID*", checkoutFlow)

export default app
