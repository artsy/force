import { Column, GridColumns, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist } from "v2/__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "v2/__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/System"
import { ArtistInsightBadgesFragmentContainer } from "v2/Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsFragmentContainer } from "v2/Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsPlaceholder } from "v2/Apps/Artist/Components/ArtistInsights/ArtistInsightAchievements"
import { extractNodes } from "v2/Utils/extractNodes"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
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
    <GridColumns gridRowGap={4}>
      <Column span={12}>
        <Text variant="lg-display">Career Highlights</Text>
      </Column>

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
      }
    `,
  }
)

const PLACEHOLDER = (
  <GridColumns gridRowGap={4}>
    <Column span={12}>
      <Text variant="lg-display">Career Highlights</Text>
    </Column>

    <Column span={6}>
      <ArtistInsightAchievementsPlaceholder />
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
