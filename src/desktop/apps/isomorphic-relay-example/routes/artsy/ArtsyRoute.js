import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { ArtworkGrid } from '@artsy/reaction/dist/Components/ArtworkGrid'

export const ArtsyRoute = createFragmentContainer(
  ({ artworks }) => {
    console.log(artworks)
    return <ArtworkGrid artworks={artworks} />
  },
  graphql`
    fragment ArtsyRoute_artworks on Artwork @relay(plural: true) {
      id
    }
  `
)
