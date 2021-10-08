import {
  Box,
  Column,
  GridColumns,
  HTML,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SelectedCareerAchievementsFragmentContainer } from "v2/Components/SelectedCareerAchievements"
import { ArtistCareerHighlights_artist } from "v2/__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "v2/__generated__/ArtistCareerHighlightsQuery.graphql"
import { ArtistConsignButtonFragmentContainer } from "./ArtistConsignButton"
import { ArtistGenesFragmentContainer } from "./ArtistGenes"
import { data as sd } from "sharify"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/System"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const { credit, partner, text } = artist.biographyBlurb!
  const showCredit = Boolean(credit) && partner?.profile?.href
  const partnerHref = `${sd.APP_URL}${partner?.profile?.href}`
  const hasCategories = Boolean(artist.related?.genes?.edges?.length)

  return (
    <GridColumns gridRowGap={4}>
      <Column span={8}>
        <Join separator={<Spacer mt={4} />}>
          <SelectedCareerAchievementsFragmentContainer
            artist={artist}
            onlyCareerHighlights
          />

          {showCredit && text && (
            <Box>
              <Text variant="xs" textTransform="uppercase" mb={1}>
                Bio
              </Text>

              <Text mb={1} variant="sm">
                <RouterLink to={partnerHref}>{credit}</RouterLink>
              </Text>

              <HTML html={text} variant="sm" />
            </Box>
          )}

          <GridColumns>
            <Column span={9}>
              <ArtistConsignButtonFragmentContainer artist={artist} />
            </Column>
          </GridColumns>
        </Join>
      </Column>

      {hasCategories && (
        <Column span={4}>
          <Text variant="md" mb={2}>
            Related categories
          </Text>

          <ArtistGenesFragmentContainer artist={artist} />
        </Column>
      )}
    </GridColumns>
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

const PLACEHOLDER = <div />

export const ArtistCareerHighlightsQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtistCareerHighlightsQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistCareerHighlightsQuery($slug: String!) {
          artist(id: $slug) {
            ...ArtistCareerHighlights_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props) {
          return PLACEHOLDER
        }
        if (props.artist) {
          return (
            <ArtistCareerHighlightsFragmentContainer artist={props.artist} />
          )
        }
      }}
    />
  )
}
