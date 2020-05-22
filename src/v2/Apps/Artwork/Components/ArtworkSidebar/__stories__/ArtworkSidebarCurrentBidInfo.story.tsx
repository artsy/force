import {
  AuctionPreview,
  AuctionPreviewNoStartingBid,
  ClosedAuctionArtwork,
  LiveAuctionInProgress,
  OpenAuctionNoReserveNoBids,
  OpenAuctionNoReserveWithBids,
  OpenAuctionReserveMetWithBids,
  OpenAuctionReserveMetWithMyLosingBid,
  OpenAuctionReserveMetWithMyWinningBid,
  OpenAuctionReserveNoBids,
  OpenAuctionReserveNotMetIncreasingOwnBid,
  OpenAuctionReserveNotMetWithBids,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarCurrentBidInfo as CurrentBidInfo } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/Sidebar", module).add(
  "CurrentBidInfo",
  () => {
    return (
      <React.Fragment>
        <Section title="Closed auction">
          <CurrentBidInfo artwork={ClosedAuctionArtwork as any} />
        </Section>
        <Section title="Open auction no reserve no bids">
          <CurrentBidInfo artwork={OpenAuctionNoReserveNoBids as any} />
        </Section>
        <Section title="Open auction no reserve with bids">
          <CurrentBidInfo artwork={OpenAuctionNoReserveWithBids as any} />
        </Section>
        <Section title="Open auction with reserve and no bids">
          <CurrentBidInfo artwork={OpenAuctionReserveNoBids as any} />
        </Section>
        <Section title="Open auction reserve not met with bids">
          <CurrentBidInfo artwork={OpenAuctionReserveNotMetWithBids as any} />
        </Section>
        <Section title="Open auction reserve met with bids">
          <CurrentBidInfo artwork={OpenAuctionReserveMetWithBids as any} />
        </Section>
        <Section title="Open auction with my bid winning">
          <CurrentBidInfo
            artwork={OpenAuctionReserveMetWithMyWinningBid as any}
          />
        </Section>
        <Section title="Open auction with me increasing my max bid while winning">
          <CurrentBidInfo
            artwork={OpenAuctionReserveNotMetIncreasingOwnBid as any}
          />
        </Section>
        <Section title="Open auction with my bid losing">
          <CurrentBidInfo
            artwork={OpenAuctionReserveMetWithMyLosingBid as any}
          />
        </Section>
        <Section title="Auction preview">
          <CurrentBidInfo artwork={AuctionPreview as any} />
        </Section>
        <Section title="Auction preview with no start bid">
          <CurrentBidInfo artwork={AuctionPreviewNoStartingBid as any} />
        </Section>
        <Section title="Live auction in progress">
          <CurrentBidInfo artwork={LiveAuctionInProgress as any} />
        </Section>
      </React.Fragment>
    )
  }
)
