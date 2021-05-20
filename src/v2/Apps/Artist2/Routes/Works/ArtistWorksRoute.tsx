import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistWorksRouteProps {
  artist: any
}

const ArtistWorksRoute: React.FC<ArtistWorksRouteProps> = props => {
  return <></>
}

export const ArtistWorksRouteFragmentContainer = createFragmentContainer(
  ArtistWorksRoute,
  {
    artist: graphql`
      fragment ArtistWorksRoute_artist on Artist {
        id
      }
    `,
  }
)
