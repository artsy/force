import { Box, Column, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist } from "__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System"
import { ArtistInsightBadgesFragmentContainer } from "Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsFragmentContainer } from "Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsPlaceholder } from "Apps/Artist/Components/ArtistInsights/ArtistInsightAchievements"
import { ArtistInsightBadgesPlaceholder } from "Apps/Artist/Components/ArtistInsights/ArtistInsightBadges"
import { extractNodes } from "Utils/extractNodes"
import { RouterLink } from "System/Router/RouterLink"
import { getENV } from "Utils/getENV"
import { CV_LINK_TEXT } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const { credit, partner, text } = artist.biographyBlurb!
  const showPartnerBio =
    Boolean(credit) && Boolean(text) && partner?.profile?.href
  const partnerHref = `${getENV("APP_URL")}/partner${partner?.profile?.href}`

  const displayInsightAchievements = artist.insightAchievements.length > 0
  // TODO: Replace with just `insightBadges.length` check
  const displayInsightBadges =
    artist.insightBadges.length > 0 ||
    (artist.auctionResultsConnection?.totalCount ?? 0) > 0 ||
    extractNodes(artist.artistHighlights?.partnersConnection).length > 0

  if (!displayInsightAchievements && !displayInsightBadges) {
    return null
  }

  return (
    <>
      {showPartnerBio && (
        <>
          <Box>
            <Text variant="xs" mb={1}>
              Bio
            </Text>
            <Text mb={1} variant="sm">
              <RouterLink to={partnerHref}>{credit}</RouterLink>
            </Text>
            <HTML html={text!} variant="sm" />
          </Box>
          <Spacer my={2} />
          <RouterLink to={`/artist/${artist.slug}/cv`}>
            {CV_LINK_TEXT}
          </RouterLink>
          <Spacer my={4} />
        </>
      )}

      <GridColumns gridRowGap={4} id="jump--artistCareerHighlights">
        {displayInsightAchievements && (
          <Column span={6}>
            <ArtistInsightAchievementsFragmentContainer artist={artist} />
          </Column>
        )}

        {displayInsightBadges && (
          <Column span={6}>
            <ArtistInsightBadgesFragmentContainer artist={artist} />
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
        ...ArtistInsightBadges_artist
        ...ArtistInsightAchievements_artist
        insightAchievements: insights(
          kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]
        ) {
          __typename
        }
        insightBadges: insights(kind: [ACTIVE_SECONDARY_MARKET]) {
          __typename
        }
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          totalCount
        }
        artistHighlights: highlights {
          partnersConnection(first: 1, partnerCategory: ["blue-chip"]) {
            edges {
              node {
                __typename
              }
            }
          }
        }
        biographyBlurb(format: HTML, partnerBio: false) {
          partner {
            profile {
              href
            }
          }
          credit
          text
        }
        slug
      }
    `,
  }
)

const PLACEHOLDER = (
  <GridColumns gridRowGap={4}>
    <Column span={6}>
      <ArtistInsightAchievementsPlaceholder />
    </Column>
    <Column span={6}>
      <ArtistInsightBadgesPlaceholder />
    </Column>
  </GridColumns>
)

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
