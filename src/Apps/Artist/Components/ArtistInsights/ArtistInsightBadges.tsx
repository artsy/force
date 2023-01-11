import {
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistInsightBadges_artist$data } from "__generated__/ArtistInsightBadges_artist.graphql"

interface ArtistInsightBadgesProps {
  artist: ArtistInsightBadges_artist$data
}

export const ArtistInsightBadges: FC<ArtistInsightBadgesProps> = ({
  artist,
}) => {
  if (artist.insightBadges.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg-display" mb={2}>
        Achievements
      </Text>
      <GridColumns>
        {artist.insightBadges.map(insight => {
          return (
            <Column span={6} key={insight.kind!}>
              <Text variant="sm" color="blue100">
                {insight.label}
              </Text>
              <Text variant="sm" color="black60">
                {insight.description}
              </Text>
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ArtistInsightBadgesFragmentContainer = createFragmentContainer(
  ArtistInsightBadges,
  {
    artist: graphql`
      fragment ArtistInsightBadges_artist on Artist {
        insightBadges: insights(
          kind: [
            ACTIVE_SECONDARY_MARKET
            HIGH_AUCTION_RECORD
            ARTSY_VANGUARD_YEAR
            CRITICALLY_ACCLAIMED
          ]
        ) {
          kind
          label
          description
        }
      }
    `,
  }
)

export const ArtistInsightBadgesPlaceholder: FC = () => {
  return (
    <Skeleton>
      <Text variant="lg-display" mb={2}>
        Achievements
      </Text>

      <GridColumns>
        <Column span={6}>
          <SkeletonText variant="sm">Active Secondary Market</SkeletonText>

          <SkeletonText variant="sm">
            Recent auction results in the Artsy Price Database.
          </SkeletonText>
        </Column>

        <Column span={6}>
          <SkeletonText variant="sm">High Auction Record</SkeletonText>

          <SkeletonText variant="sm">US$85.0m, Phillips, 2022</SkeletonText>
        </Column>
      </GridColumns>
    </Skeleton>
  )
}
