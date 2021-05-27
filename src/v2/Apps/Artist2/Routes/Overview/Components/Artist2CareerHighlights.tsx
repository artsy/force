import { Box, Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { Artist2CareerHighlights_artist } from "v2/__generated__/Artist2CareerHighlights_artist.graphql"
import { Artist2GenesFragmentContainer } from "./Artist2Genes"

interface Artist2CareerHighlightsProps {
  artist: Artist2CareerHighlights_artist
}

const Artist2CareerHighlights: React.FC<Artist2CareerHighlightsProps> = ({
  artist,
}) => {
  return (
    <Box>
      <Text variant="lg" mb={4}>
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
  )
}

export const Artist2CareerHighlightsFragmentContainer = createFragmentContainer(
  Artist2CareerHighlights,
  {
    artist: graphql`
      fragment Artist2CareerHighlights_artist on Artist {
        ...SelectedCareerAchievements_artist
        ...Artist2Genes_artist
      }
    `,
  }
)
