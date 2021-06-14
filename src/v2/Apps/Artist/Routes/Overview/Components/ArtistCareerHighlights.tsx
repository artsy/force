import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { ArtistCareerHighlights_artist } from "v2/__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistConsignButtonFragmentContainer } from "./ArtistConsignButton"
import { ArtistGenesFragmentContainer } from "./ArtistGenes"
import { data as sd } from "sharify"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const { credit, partner, text } = artist.biographyBlurb!
  const showCredit = Boolean(credit) && partner?.profile?.href
  const partnerHref = `${sd.APP_URL}${partner?.profile?.href}`
  console.log(partnerHref)
  const hasCategories = Boolean(artist.related?.genes?.edges?.length)

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
            <ArtistConsignButtonFragmentContainer artist={artist} />
          </Box>
        </Column>

        {hasCategories && (
          <Column span={4}>
            <Box>
              <Text variant="md" mb={2}>
                Related categories
              </Text>
              <ArtistGenesFragmentContainer artist={artist} />
            </Box>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const ArtistCareerHighlightsFragmentContainer = createFragmentContainer(
  ArtistCareerHighlights,
  {
    artist: graphql`
      fragment ArtistCareerHighlights_artist on Artist {
        ...SelectedCareerAchievements_artist
        ...ArtistConsignButton_artist
        ...ArtistGenes_artist
        biographyBlurb(format: HTML, partnerBio: false) {
          partner {
            profile {
              href
            }
          }
          credit
          text
        }
        name
        related {
          genes {
            edges {
              node {
                id
              }
            }
          }
        }
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
