import { AuctionFAQFragmentContainer as AuctionFAQ } from "v2/Apps/Auction/Components/AuctionFAQ"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("AuctionFAQ", () => {
  return (
    <React.Fragment>
      <Section title="Auction FAQ Modal">
        <AuctionFAQ viewer={null} />
      </Section>
    </React.Fragment>
  )
})
