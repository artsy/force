import { storiesOf } from "@storybook/react"
import React from "react"

import { Contents } from "v2/Apps/Artist/Components/MarketDataSummary"
import { SystemContextProvider } from "v2/Artsy"

function RenderMarketDataSummaryFor(artistID: string) {
  return (
    <SystemContextProvider>
      <Contents artistID={artistID} />
    </SystemContextProvider>
  )
}

storiesOf("Apps/Artist/Components/MarketDataSummary", module)
  .add("Pablo Picasso", () => RenderMarketDataSummaryFor("pablo-picasso"))
  .add("Andy Warhol", () => RenderMarketDataSummaryFor("andy-warhol"))
  .add("Damon Zucconi", () => RenderMarketDataSummaryFor("damon-zucconi"))
  .add("Huma Bhabha", () => RenderMarketDataSummaryFor("huma-bhabha"))
  .add("Robert Longo", () => RenderMarketDataSummaryFor("robert-longo"))
  .add("Carla Accardi", () => RenderMarketDataSummaryFor("carla-accardi"))
  .add("Armando Castro-Uribe (none)", () =>
    RenderMarketDataSummaryFor("armando-castro-uribe")
  )
