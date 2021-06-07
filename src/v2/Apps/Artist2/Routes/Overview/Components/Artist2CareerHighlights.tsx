import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
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
    <>
      <GridColumns>
        <Column span={8}>
          <>
            <SelectedCareerAchievementsFragmentContainer
              artist={artist}
              onlyCareerHighlights
              mb={4}
            />
          </>
          {showCredit && text && (
            <>
              <Text variant="xs" textTransform="uppercase" mt={[2, 0]} mb={1}>
                Bio
              </Text>
              <Text pb={1} variant="text">
                <em>
                  <RouterLink to={partnerHref}>{credit}</RouterLink>
                </em>
              </Text>
              <Text variant="text" pr={[0, 2]}>
                <BioSpan
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
              </Text>

              <Spacer mb={4} />
            </>
          )}

          <Box width={["100%", "72%"]}>
            <Artist2ConsignButtonFragmentContainer artist={artist} />
          </Box>
        </Column>
        <Column span={4}>
          <Box>
            <Text variant="md" mb={2}>
              Related categories
            </Text>
            <Artist2GenesFragmentContainer artist={artist} />
          </Box>
        </Column>
      </GridColumns>
    </>
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
        name
        slug
      }
    `,
  }
)

/**
 * Using dangerouslySetInnerHTML in our span adds an inline <p>. Here we make
 * sure the inline <p> is formatted properly.
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
