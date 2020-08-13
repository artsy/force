import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "v2/Artsy/Relay/RootQueryRenderer"
import Metadata from "../Artwork/Metadata"

function ArtworkExample(props: { artworkID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkMetadataQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Metadata_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState =>
        readyState.props && <Metadata {...(readyState.props as any)} />
      }
    />
  )
}

storiesOf("Components/Artwork/Metadata", module)
  .add("A not-for-sale artwork", () => (
    <ArtworkExample artworkID="andy-warhol-skull" />
  ))
  .add("A for-sale artwork with exact price", () => (
    <ArtworkExample artworkID="stephen-berkman-a-history-of-dread" />
  ))
