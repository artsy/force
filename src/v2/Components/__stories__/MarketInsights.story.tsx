import { artistResponse } from "v2/Apps/__tests__/Fixtures/MarketInsights"
import { MarketInsights } from "v2/Components/ArtistMarketInsights"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Components", module).add("MarketInsights v1", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights artist={artistResponse as any} />
      </Section>
    </React.Fragment>
  )
})
