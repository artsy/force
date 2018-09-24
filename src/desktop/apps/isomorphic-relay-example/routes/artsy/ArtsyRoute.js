import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkGrid } from "reaction/Components/ArtworkGrid"

export const ArtsyRoute = createFragmentContainer(
  ({ artworks }) => {
    return <ArtworkGrid artworks={artworks} />
  },
  graphql`
    fragment ArtsyRoute_artworks on Artwork @relay(plural: true) {
      id
    }
  `
)
