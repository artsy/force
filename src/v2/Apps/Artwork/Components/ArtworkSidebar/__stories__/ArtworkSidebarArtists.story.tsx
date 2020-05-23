import {
  MultipleArtists,
  SingleFollowedArtist,
  SingleNonFollowedArtist,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer as Artists } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

const MockArtworkSidebarArtists = ({ artwork }) => {
  return (
    <MockRelayRenderer
      Component={Artists}
      mockData={{ artwork }}
      query={graphql`
        query ArtworkSidebarArtistsStoryQuery {
          artwork(id: "unused") {
            ...ArtworkSidebarArtists_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Apps/Artwork/Components/Sidebar", module).add("Artists", () => {
  return (
    <React.Fragment>
      <Section title="Single Followed Artist">
        <MockArtworkSidebarArtists artwork={SingleFollowedArtist as any} />
      </Section>
      <Section title="Single Not Followed Artist">
        <MockArtworkSidebarArtists artwork={SingleNonFollowedArtist as any} />
      </Section>
      <Section title="Multipe Artists">
        <MockArtworkSidebarArtists artwork={MultipleArtists as any} />
      </Section>
    </React.Fragment>
  )
})
