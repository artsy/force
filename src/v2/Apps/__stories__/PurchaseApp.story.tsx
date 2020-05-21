import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as purchaseRoutes } from "../Purchase/routes"

storiesOf("Apps/Purchase", module).add("Default", () => {
  return <MockRouter routes={purchaseRoutes} initialRoute="/user/purchases" />
})
