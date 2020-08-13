import { storiesOf } from "@storybook/react"
import React from "react"

import { Contents } from "v2/Apps/Artist/Components/MarketInsights"
import { SystemContextProvider } from "v2/Artsy"

function RenderMarketInsightsFor(artistID: string) {
  return (
    <SystemContextProvider>
      <Contents artistID={artistID} />
    </SystemContextProvider>
  )
}

storiesOf("Apps/Artist/Components/ArtistMarketInsights", module)
  .add("Pablo Picasso", () => RenderMarketInsightsFor("pablo-picasso"))
  .add("Andy Warhol", () => RenderMarketInsightsFor("andy-warhol"))
  .add("Damon Zucconi", () => RenderMarketInsightsFor("damon-zucconi"))
  .add("Huma Bhabha", () => RenderMarketInsightsFor("huma-bhabha"))
  .add("Robert Longo", () => RenderMarketInsightsFor("robert-longo"))
  .add("Carla Accardi", () => RenderMarketInsightsFor("carla-accardi"))
  .add("Armando Castro-Uribe (none)", () =>
    RenderMarketInsightsFor("armando-castro-uribe")
  )
