import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { PricingTransparency } from "../PricingTransparency"

storiesOf("Apps/Auction/Components", module).add("Pricing Transparency", () => {
  return (
    <Section>
      <PricingTransparency
        artwork={{
          saleArtwork: {
            calculatedCost: {
              bidAmount: {
                display: "$5,000",
              },
              buyersPremium: {
                display: "$1,000",
              },
              subtotal: {
                display: "$6,000",
              },
            },
          },
        }}
      />
    </Section>
  )
})
