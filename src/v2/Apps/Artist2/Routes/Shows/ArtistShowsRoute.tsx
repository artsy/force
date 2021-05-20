import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistShowsRouteProps {
  artist: any
}

const ArtistShowsRoute: React.FC<ArtistShowsRouteProps> = props => {
  return <></>
}

export const ArtistShowsRouteFragmentContainer = createFragmentContainer(
  ArtistShowsRoute,
  {
    artist: graphql`
      fragment ArtistShowsRoute_artist on Artist {
        id
      }
    `,
  }
)
