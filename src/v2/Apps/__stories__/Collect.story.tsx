import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { collectRoutes } from "../Collect/collectRoutes"

storiesOf("Apps/Collect", module)
  .add("Collect", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collect"
        context={{
          // FIXME: Remove after A/B test completes
          // @ts-ignore
          COLLECTION_HUBS: "experiment",
        }}
      />
    )
  })
  .add("Collections", () => {
    return <MockRouter routes={collectRoutes} initialRoute="/collections" />
  })

storiesOf("Apps/Collect/Collection", module)
  .add("Collection", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/abstract-expressionism-works-on-paper"
      />
    )
  })
  .add("Collection with Hub rails", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/german-artists"
      />
    )
  })
