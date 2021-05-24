import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Genes } from "v2/Apps/Artist/Routes/Overview/Components/Genes"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { Artist2GenesFragmentContainer } from "../../Components/Artist2Genes"
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

      <Flex>
        <Box>
          <Text variant="lg" mt={4} mb={2}>
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
      </Flex>
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        ...Artist2Genes_artist
        ...Artist2NotableWorks_artist
        ...SelectedCareerAchievements_artist
      }
    `,
  }
)
