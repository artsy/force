import {
  Box,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { Artist2GenesFragmentContainer } from "v2/Apps/Artist2/Routes/Overview/Components/Artist2Genes"
import { Artist2IconicCollectionsRailQueryRenderer } from "v2/Apps/Artist2/Routes/Overview/Components/IconicCollectionsRail/Artist2IconicCollectionsRail"
import { Artist2NotableWorksRailFragmentContainer } from "v2/Apps/Artist2/Routes/Overview/Components/Artist2NotableWorksRail"
import { Artist2WorksForSaleRailFragmentContainer } from "./Components/Artist2WorksForSaleRail"
import { Artist2CurrentShowsRailFragmentContainer } from "./Components/Artist2CurrentShowsRail"

interface ArtistOverviewRouteProps {
  artist: any
}

const ArtistOverviewRoute: React.FC<ArtistOverviewRouteProps> = ({
  artist,
}) => {
  return (
    <Join separator={<Spacer pt={6} />}>
      <Artist2NotableWorksRailFragmentContainer artist={artist} />

      <Box>
        <Text variant="lg" mb={2}>
          Career Highlights
        </Text>
        <GridColumns>
          <Column span={8}>
            <SelectedCareerAchievementsFragmentContainer
              artist={artist}
              onlyCareerHighlights
            />
          </Column>
          <Column span={4}>
            <Box>
              <Text variant="md" mt={10} mb={2}>
                Related categories
              </Text>
              <Artist2GenesFragmentContainer artist={artist} />
            </Box>
          </Column>
        </GridColumns>
      </Box>

      <Artist2IconicCollectionsRailQueryRenderer artistID={artist.internalID} />
      <Artist2WorksForSaleRailFragmentContainer artist={artist} />
      <Artist2CurrentShowsRailFragmentContainer artist={artist} />
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
        ...SelectedCareerAchievements_artist

        internalID
      }
    `,
  }
)
