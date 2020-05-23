import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "v2/Artsy/SystemContext"
import { MockRouter } from "v2/DevTools"

import { getAppRoutes } from "v2/Apps/getAppRoutes"

storiesOf("Apps", module).add("AppShell", () => {
  return (
    <SystemContextProvider>
      <MockRouter
        routes={getAppRoutes()}
        initialRoute="/viewing-room/subscription-demo-gg-guy-yanai"
        context={{
          mediator: {
            trigger: x => x,
            on: x => x,
            off: x => x,
          },
        }}
      />
    </SystemContextProvider>
  )
})
