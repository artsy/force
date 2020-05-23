import {
  ArtworkAuctionPreview,
  ArtworkClosedAuction,
  ArtworkNoEstimateNoPremium,
  ArtworkWithEstimateAndPremium,
  ArtworkWithEstimateNoPremium,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarAuctionPartnerInfo as AuctionPartnerInfo } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/Sidebar", module).add(
  "AuctionPartnerInfo",
  () => {
    return (
      <React.Fragment>
        <Section title="Auction name only">
          <AuctionPartnerInfo artwork={ArtworkNoEstimateNoPremium as any} />
        </Section>
        <Section title="Artwork with estimate">
          <AuctionPartnerInfo artwork={ArtworkWithEstimateNoPremium as any} />
        </Section>
        <Section title="Artwork with estimate and buyer's premium">
          <AuctionPartnerInfo artwork={ArtworkWithEstimateAndPremium as any} />
        </Section>
        <Section title="Closed Auction">
          <AuctionPartnerInfo artwork={ArtworkClosedAuction as any} />
        </Section>
        <Section title="Auction in preview">
          <AuctionPartnerInfo artwork={ArtworkAuctionPreview as any} />
        </Section>
      </React.Fragment>
    )
  }
)
