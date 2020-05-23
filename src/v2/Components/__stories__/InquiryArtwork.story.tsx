import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "v2/Artsy/Relay/RootQueryRenderer"
import InquiryArtwork from "../InquiryArtwork"

function ArtworkExample(props: { artworkID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query InquiryArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...InquiryArtwork_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState =>
        readyState.props && <InquiryArtwork {...(readyState.props as any)} />
      }
    />
  )
}

storiesOf("Components/Inquiry Artwork", module)
  .add("A square artwork", () => (
    <ArtworkExample artworkID="christopher-burkett-coastal-storm-oregon" />
  ))
  .add("A landscape artwork", () => (
    <ArtworkExample artworkID="andrew-moore-puente-de-bacunayagua-via-blanca" />
  ))
  .add("A landscape artwork (extra wide)", () => (
    <ArtworkExample artworkID="brian-kosoff-bay-of-islands" />
  ))
  .add("A portrait artwork", () => (
    <ArtworkExample artworkID="damien-hirst-methylamine-13c-19?auction_id=heather-james-fine-art-curators-choice" />
  ))
  .add("A portrait artwork (extra tall)", () => (
    <ArtworkExample artworkID="snik-untitled-vertical" />
  ))
  .add("Artwork with two artists", () => (
    <ArtworkExample artworkID="/william-kentridge-self-portrait-as-a-coffee-pot-iii" />
  ))
