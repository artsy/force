import {
  Column,
  GridColumns,
  Skeleton,
  SkeletonBox,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist } from "v2/__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "v2/__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/System"
import { ArtistInsightBadgesFragmentContainer } from "v2/Apps/Artist/Components/ArtistInsights"
import { ArtistInsightAchievementsFragmentContainer } from "v2/Apps/Artist/Components/ArtistInsights"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist
}

const ArtistCareerHighlights: React.FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  return (
    <GridColumns gridRowGap={4}>
      <Column span={6}>
        <ArtistInsightAchievementsFragmentContainer artist={artist} />
      </Column>

      <Column span={6}>
        <ArtistInsightBadgesFragmentContainer artist={artist} />
      </Column>
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
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Text variant="lg-display" mb={4}>
      Career highlights
    </Text>
    <SkeletonBox width="100%" height={170} />
  </Skeleton>
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
