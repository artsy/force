import {
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightBadges_artist } from "v2/__generated__/ArtistInsightBadges_artist.graphql"

interface ArtistInsightBadgesProps {
  artist: ArtistInsightBadges_artist
}

export const ArtistInsightBadges: FC<ArtistInsightBadgesProps> = ({
  artist,
}) => {
  // The first result is the highest auction result
  const highAuctionResult = extractNodes(artist.auctionResultsConnection)[0]
  const highAuctionRecord = highAuctionResult
    ? `${highAuctionResult.priceRealized?.display}, ${highAuctionResult.organization}, ${highAuctionResult.saleDate}`
    : null

  if (artist.insights.length === 0 && !highAuctionResult) {
    return null
  }

  return (
    <>
      <Text variant="lg-display" mb={2}>
        Achievements
      </Text>
      <GridColumns>
        {artist.insights.map(insight => {
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

        {highAuctionRecord && (
          <Column span={6}>
            <Text variant="sm" color="blue100">
              High Auction Record
            </Text>

            <Text variant="sm" color="black60">
              {highAuctionRecord}
            </Text>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const ArtistInsightBadgesFragmentContainer = createFragmentContainer(
  ArtistInsightBadges,
  {
    artist: graphql`
      fragment ArtistInsightBadges_artist on Artist {
        insights(kind: [ACTIVE_SECONDARY_MARKET]) {
          kind
          label
          description
        }
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              priceRealized {
                display(format: "0.0a")
              }
              organization
              saleDate(format: "YYYY")
            }
          }
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
            Recent auction results in the Artsy Price Database
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
