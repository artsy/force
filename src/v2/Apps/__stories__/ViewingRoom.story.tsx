import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as viewingRoomRoutes } from "v2/Apps/ViewingRoom/routes"

storiesOf("Apps/ViewingRoom", module)
  .add("Viewing Room (Guy Yanai) ", () => {
    return (
      <MockRouter
        routes={viewingRoomRoutes}
        initialRoute="/viewing-room/subscription-demo-gg-guy-yanai"
      />
    )
  })
  .add("Viewing Room (Christine) ", () => {
    return (
      <MockRouter
        routes={viewingRoomRoutes}
        initialRoute="/viewing-room/invoicing-demo-partner-christine-sun-kim"
      />
    )
  })
