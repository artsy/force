import { Join, Spacer } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2IconicCollectionsRailQueryRenderer } from "v2/Apps/Artist2/Routes/Overview/Components/IconicCollectionsRail/Artist2IconicCollectionsRail"
import { Artist2NotableWorksRailFragmentContainer } from "v2/Apps/Artist2/Routes/Overview/Components/Artist2NotableWorksRail"
import { Artist2WorksForSaleRailFragmentContainer } from "./Components/Artist2WorksForSaleRail"
import { Artist2CurrentShowsRailFragmentContainer } from "./Components/Artist2CurrentShowsRail"
import { Artist2CurrentArticlesRailFragmentContainer } from "./Components/Artist2CurrentArticlesRail"
import { Artist2CareerHighlightsFragmentContainer } from "./Components/Artist2CareerHighlights"

interface ArtistOverviewRouteProps {
  artist: any
}

const ArtistOverviewRoute: React.FC<ArtistOverviewRouteProps> = ({
  artist,
}) => {
  return (
    <Join separator={<Spacer pt={6} />}>
      <Artist2NotableWorksRailFragmentContainer artist={artist} />
      <Artist2CareerHighlightsFragmentContainer artist={artist} />
      <Artist2IconicCollectionsRailQueryRenderer artistID={artist.internalID} />
      <Artist2WorksForSaleRailFragmentContainer artist={artist} />
      <Artist2CurrentShowsRailFragmentContainer artist={artist} />
      <Artist2CurrentArticlesRailFragmentContainer artist={artist} />
    </Join>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        ...Artist2Genes_artist
        ...Artist2NotableWorksRail_artist
        ...Artist2WorksForSaleRail_artist
        ...Artist2CurrentShowsRail_artist
        ...Artist2CurrentArticlesRail_artist
        ...SelectedCareerAchievements_artist

        internalID
      }
    `,
  }
)
