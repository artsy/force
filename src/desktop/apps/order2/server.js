import express from "express"
import { checkoutFlow } from "desktop/apps/order2"

const app = express()

app.get("/order2/:orderID*", checkoutFlow)

export default app
