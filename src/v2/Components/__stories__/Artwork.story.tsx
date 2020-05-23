import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "v2/Artsy/Relay/RootQueryRenderer"
import Artwork from "../Artwork"

function ArtworkExample(props: { artworkID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Artwork_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState =>
        readyState.props && <Artwork {...(readyState.props as any)} />
      }
    />
  )
}

storiesOf("Components/Artwork/Singular", module)
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
    <ArtworkExample artworkID="helen-frankenthaler-madame-de-pompadour-2" />
  ))
  .add("A portrait artwork (extra tall)", () => (
    <ArtworkExample artworkID="snik-untitled-vertical" />
  ))
