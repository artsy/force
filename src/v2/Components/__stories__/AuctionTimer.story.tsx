import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "v2/Artsy"
import { AuctionTimerQueryRenderer } from "v2/Components/AuctionTimer"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("AuctionTimer", () => {
  return (
    <React.Fragment>
      <Section title="Piasa Abstraction">
        <SystemContextProvider>
          <AuctionTimerQueryRenderer saleID="piasa-abstraction-in-craft-american-quilts-at-the-turn-of-the-20th-century-and-american-design" />
        </SystemContextProvider>
      </Section>
      <Section title="EHC Fine Art">
        <SystemContextProvider>
          <AuctionTimerQueryRenderer saleID="ehc-fine-art-essential-editions-vii" />
        </SystemContextProvider>
      </Section>
    </React.Fragment>
  )
})
