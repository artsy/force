import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2NotableWorksFragmentContainer } from "../../Components/Artist2NotableWorks"

interface ArtistOverviewRouteProps {
  artist: any
}

const ArtistOverviewRoute: React.FC<ArtistOverviewRouteProps> = ({
  artist,
}) => {
  return (
    <>
      <Artist2NotableWorksFragmentContainer artist={artist} />
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        ...Artist2NotableWorks_artist
      }
    `,
  }
)
