import {
  EmptyMetadataMultipleEditionSets,
  EmptyMetadataNoEditions,
  EmptyMetadataOneEditionSet,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
  MetadataForAuctionWork,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarMetadata"
import { ArtworkSidebarMetadataFragmentContainer as Metadata } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

const MockArtworkSidebarMetadata = ({ artwork }) => {
  return (
    <MockRelayRenderer
      Component={Metadata}
      mockData={{ artwork }}
      query={graphql`
        query ArtworkSidebarMetadataStoryQuery {
          artwork(id: "unused") {
            ...ArtworkSidebarMetadata_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Apps/Artwork/Components/Sidebar", module).add("Metadata", () => {
  return (
    <React.Fragment>
      <Section title="Filled out metadata no editions">
        <MockArtworkSidebarMetadata
          artwork={FilledOutMetadataNoEditions as any}
        />
      </Section>
      <Section title="Filled out metadata one edition set">
        <MockArtworkSidebarMetadata
          artwork={FilledOutMetadataOneEditionSet as any}
        />
      </Section>
      <Section title="Filled out metadata multiple edition sets">
        <MockArtworkSidebarMetadata
          artwork={FilledOutMetadataMultipleEditionSets as any}
        />
      </Section>
      <Section title="Empty metadata no editions">
        <MockArtworkSidebarMetadata artwork={EmptyMetadataNoEditions as any} />
      </Section>
      <Section title="Empty metadata one edition set">
        <MockArtworkSidebarMetadata
          artwork={EmptyMetadataOneEditionSet as any}
        />
      </Section>
      <Section title="Empty metadata multiple edition sets">
        <MockArtworkSidebarMetadata
          artwork={EmptyMetadataMultipleEditionSets as any}
        />
      </Section>
      <Section title="Artwork in an auction">
        <MockArtworkSidebarMetadata artwork={MetadataForAuctionWork as any} />
      </Section>
    </React.Fragment>
  )
})
