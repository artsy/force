import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistCVRouteProps {
  artist: any
}

const ArtistCVRoute: React.FC<ArtistCVRouteProps> = props => {
  return <></>
}

export const ArtistCVRouteFragmentContainer = createFragmentContainer(
  ArtistCVRoute,
  {
    artist: graphql`
      fragment ArtistCVRoute_artist on Artist {
        id
      }
    `,
  }
)
