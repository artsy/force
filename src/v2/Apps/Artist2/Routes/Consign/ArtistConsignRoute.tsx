import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistConsignRouteProps {
  artist: any
}

const ArtistConsignRoute: React.FC<ArtistConsignRouteProps> = props => {
  return <></>
}

export const ArtistConsignRouteFragmentContainer = createFragmentContainer(
  ArtistConsignRoute,
  {
    artist: graphql`
      fragment ArtistConsignRoute_artist on Artist {
        id
      }
    `,
  }
)
