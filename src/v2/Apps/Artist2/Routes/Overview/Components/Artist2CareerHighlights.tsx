import { Box, Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { Artist2CareerHighlights_artist } from "v2/__generated__/Artist2CareerHighlights_artist.graphql"
import { Artist2ConsignButtonFragmentContainer } from "./Artist2ConsignButton"
import { Artist2GenesFragmentContainer } from "./Artist2Genes"
import { data as sd } from "sharify"

interface Artist2CareerHighlightsProps {
  artist: Artist2CareerHighlights_artist
}

const Artist2CareerHighlights: React.FC<Artist2CareerHighlightsProps> = ({
  artist,
}) => {
  const { credit, partnerID, text } = artist.biographyBlurb!
  const showCredit = Boolean(credit)
  const partnerHref = `${sd.APP_URL}/${partnerID}`

  return (
    <Box>
      <Text variant="lg" mb={4}>
        Career Highlights
      </Text>
      <GridColumns>
        <Column span={8}>
          <Join separator={<Spacer my={4} />}>
            <SelectedCareerAchievementsFragmentContainer
              artist={artist}
              onlyCareerHighlights
            />

            {showCredit && text && (
              <>
                <Text pb={1} variant="text">
                  <em>
                    <RouterLink to={partnerHref}>{credit}</RouterLink>
                  </em>
                </Text>
                <Text variant="text">
                  <BioSpan
                    dangerouslySetInnerHTML={{
                      __html: text,
                    }}
                  />
                </Text>
              </>
            )}

            <Box width="50%">
              <Artist2ConsignButtonFragmentContainer artist={artist} />
            </Box>
          </Join>
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
        ...Artist2ConsignButton_artist
        ...Artist2Genes_artist

        biographyBlurb(format: HTML, partnerBio: true) {
          credit
          partnerID
          text
        }
      }
    `,
  }
)

/*
  Using dangerouslySetInnerHTML in our span adds an inline <p>.
  Here we make sure the inline <p> is formatted properly.
*/
const BioSpan = styled.span`
  > * {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-bottom: 1em;
  }
  > *:last-child {
    display: inline;
  }
`
