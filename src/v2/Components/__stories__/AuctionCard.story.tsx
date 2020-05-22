import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { AuctionCard, LargeAuctionCard, SmallAuctionCard } from "../AuctionCard"

storiesOf("Styleguide/Components", module).add("AuctionCard", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Auction Card">
        <AuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
          isGalleryAuction={false}
          isBenefit={false}
          href="#"
        />
      </Section>
      <Section title="Large Auction Card">
        <LargeAuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
          isGalleryAuction={false}
          isBenefit={false}
          href="#"
        />
      </Section>
      <Section title="Large Auction Card for benefit auction">
        <LargeAuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="MOMA Benefit Auction"
          subHeadline="MOMA Benefit Auction"
          badge="In progress"
          isGalleryAuction={false}
          isBenefit
          href="#"
        />
      </Section>
      <Section title="Small Auction Card">
        <SmallAuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
          isGalleryAuction={false}
          isBenefit={false}
          href="#"
        />
      </Section>
      <Section title="Small Auction Card for gallery auction">
        <SmallAuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Pace Gallery"
          subHeadline="Pace Gallery"
          badge="In progress"
          isGalleryAuction
          isBenefit={false}
          href="#"
        />
      </Section>
    </React.Fragment>
  )
})
