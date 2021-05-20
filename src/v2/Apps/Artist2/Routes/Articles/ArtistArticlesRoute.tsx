import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistArticlesRouteProps {
  artist: any
}

const ArtistArticlesRoute: React.FC<ArtistArticlesRouteProps> = props => {
  return <></>
}

export const ArtistArticlesRouteFragmentContainer = createFragmentContainer(
  ArtistArticlesRoute,
  {
    artist: graphql`
      fragment ArtistArticlesRoute_artist on Artist {
        id
      }
    `,
  }
)
