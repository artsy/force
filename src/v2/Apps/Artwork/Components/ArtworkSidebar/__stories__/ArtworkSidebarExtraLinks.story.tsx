import {
  AcquireableArtworkWithOneConsignableArtist,
  InquireableArtworkWithMultipleConsignableArtists,
  InquireableArtworkWithNoConsignableArtists,
  InquireableArtworkWithOneConsignableArtist,
  LiveAuctionArtwork,
  NotForSaleArtworkWithMultipleConsignableArtist,
  NotForSaleArtworkWithNoConsignableArtists,
  NotForSaleArtworkWithOneConsignableArtist,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarExtraLinks"
import { ArtworkSidebarExtraLinks as ExtraLinks } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarExtraLinks"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/Sidebar", module).add("ExtraLinks", () => {
  return (
    <React.Fragment>
      <Section title="Not for sale artwork with no consignable artists">
        <ExtraLinks
          artwork={NotForSaleArtworkWithNoConsignableArtists as any}
        />
      </Section>

      <Section title="Not for sale artwork with one consignable artist">
        <ExtraLinks
          artwork={NotForSaleArtworkWithOneConsignableArtist as any}
        />
      </Section>

      <Section title="Not for sale artwork with multiple consignable artists">
        <ExtraLinks
          artwork={NotForSaleArtworkWithMultipleConsignableArtist as any}
        />
      </Section>

      <Section title="Artwork from live auction">
        <ExtraLinks artwork={LiveAuctionArtwork as any} />
      </Section>

      <Section title="Buy now artwork with one consignable artist">
        <ExtraLinks
          artwork={AcquireableArtworkWithOneConsignableArtist as any}
        />
      </Section>

      <Section title="For sale inquireable artwork with no consignable artists">
        <ExtraLinks
          artwork={InquireableArtworkWithNoConsignableArtists as any}
        />
      </Section>

      <Section title="For sale inquireable artwork with one consignable artist">
        <ExtraLinks
          artwork={InquireableArtworkWithOneConsignableArtist as any}
        />
      </Section>

      <Section title="For sale inquireable artwork with multiple consignable artists">
        <ExtraLinks
          artwork={InquireableArtworkWithMultipleConsignableArtists as any}
        />
      </Section>
    </React.Fragment>
  )
})
