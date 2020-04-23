import express from "express"
import { checkoutFlow } from "desktop/apps/order/routes"
import { skipIfClientSideRoutingEnabled } from "desktop/components/split_test/skipIfClientSideRoutingEnabled"

export const app = express()

app.get("/orders/:orderID*", skipIfClientSideRoutingEnabled, checkoutFlow)
