import { ArtworkSidebarFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

import {
  ClosedAuctionArtwork,
  CollecingInstitutionArtwork,
  LiveAuctionArtwork,
  MultipleArtistsArtwork,
  OpenAuctionArtwork,
  RegularArtworkWithOneEdition,
  RegularArtworkWithTwoEditions,
  RegularNonEditionedArtwork,
  VideoArtwork,
} from "v2/Apps/__tests__/Fixtures/Artworks"
import { MockRelayRenderer } from "v2/DevTools"
import { graphql } from "react-relay"

const MockArtworkSidebar = ({ artwork }) => {
  return (
    <MockRelayRenderer
      Component={ArtworkSidebarFragmentContainer}
      mockData={{ artwork }}
      query={graphql`
        query ArtworkSidebarStoryQuery {
          artwork(id: "unused") {
            ...ArtworkSidebar_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Apps/Artwork/Components", module).add("Sidebar", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with collectiing_institution attribute set">
        <MockArtworkSidebar artwork={CollecingInstitutionArtwork as any} />
      </Section>
      <Section title="Multiple artists artwork">
        <MockArtworkSidebar artwork={MultipleArtistsArtwork as any} />
      </Section>
      <Section title="Regular non editioned artwork">
        <MockArtworkSidebar artwork={RegularNonEditionedArtwork as any} />
      </Section>
      <Section title="Regular artwork with 1 edition set">
        <MockArtworkSidebar artwork={RegularArtworkWithOneEdition as any} />
      </Section>
      <Section title="Regular artwork with 2 editions">
        <MockArtworkSidebar artwork={RegularArtworkWithTwoEditions as any} />
      </Section>
      <Section title="Video artwork">
        <MockArtworkSidebar artwork={VideoArtwork as any} />
      </Section>
      <Section title="Current auction artwork with bidding allowed">
        <MockArtworkSidebar artwork={OpenAuctionArtwork as any} />
      </Section>
      <Section title="Live auction artwork">
        <MockArtworkSidebar artwork={LiveAuctionArtwork as any} />
      </Section>
      <Section title="Closed auction artwork">
        <MockArtworkSidebar artwork={ClosedAuctionArtwork as any} />
      </Section>
    </React.Fragment>
  )
})
