import { BlueChipIcon, Box, Flex, Join, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightsBadges_artist } from "v2/__generated__/ArtistInsightsBadges_artist.graphql"

interface ArtistInsightsBadgesProps {
  artist: ArtistInsightsBadges_artist
}

const ARTIST_BADGES_TEMPLATE = {
  ACTIVE_SECONDARY_MARKET: {
    title: "Active Secondary Market",
    description: "Recent auction results in the Artsy Price Database.",
  },
  BLUE_CHIP_REPRESENTATION: {
    title: "Blue Chip Representation",
    description: "Represented by internationally reputable galleries.",
  },
  CRITICALLY_ACCLAIMED: {
    title: "Critically Acclaimed",
    description: "Recognized by major institutions and publications.",
  },
  ARTSY_VANGUARD: {
    title: "The Artsy Vanguard",
    description:
      "Featured in Artsy's annual list of the most promising artists working today.",
  },
}

interface ArtistBadgeProps {
  badgeType: string
}

export const ArtistBadge: FC<ArtistBadgeProps> = ({ badgeType }) => {
  const title = ARTIST_BADGES_TEMPLATE[badgeType].title
  const description = ARTIST_BADGES_TEMPLATE[badgeType].description

  return (
    <Flex flexDirection="row">
      <BlueChipIcon mr={3} fill="blue100" />
      <Flex flexDirection="column">
        <Text variant="sm" color="blue100">
          {title}
        </Text>
        <Text color="black60">{description}</Text>
      </Flex>
    </Flex>
  )
}

interface HighAuctionRecordBadgeProps {
  highAuctionResults: object
}

export const HighAuctionRecordBadge: FC<HighAuctionRecordBadgeProps> = ({
  highAuctionResults,
}) => {
  // const highAuctionRecord = `${highAuctionResults.price_realized.display}, ${highAuctionResults.organization}, ${highAuctionResults.sale_date}`

  return (
    <Flex flexDirection="row">
      <BlueChipIcon mr={3} fill="blue100" />
      <Flex flexDirection="column">
        <Text variant="sm" color="blue100">
          High Auction Record
        </Text>
        {/* <Text color="black60">{highAuctionRecord}</Text> */}
      </Flex>
    </Flex>
  )
}

export const ArtistInsightsBadges: FC<ArtistInsightsBadgesProps> = ({
  artist,
}) => {
  if (
    !artist.insights ||
    !artist.artistHighlights ||
    !artist.auctionResultsConnection
  )
    return null

  const blueChipRepresentation = extractNodes(
    artist.artistHighlights.partnersConnection
  )

  const highAuctionResults = extractNodes(artist.auctionResultsConnection)[0]

  return (
    <Box>
      <Text variant="lg-display" color="black100">
        Artist Badges
      </Text>
      <Spacer mb={4} />
      <Join separator={<Spacer mb={2} />}>
        {blueChipRepresentation.length > 0 && (
          <ArtistBadge badgeType="BLUE_CHIP_REPRESENTATION" />
        )}
        <HighAuctionRecordBadge highAuctionResults={highAuctionResults} />
        {/* {artist.insights.map(insight => {
          if (insight?.type) {
            return <ArtistBadge badgeType={insight.type} />
          }
        })} */}
      </Join>
    </Box>
  )
}

export const ArtistInsightsBadgesFragmentContainer = createFragmentContainer(
  ArtistInsightsBadges,
  {
    artist: graphql`
      fragment ArtistInsightsBadges_artist on Artist {
        insights {
          type
          label
          entities
        }
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              price_realized: priceRealized {
                display(format: "0.0a")
              }
              organization
              sale_date: saleDate(format: "YYYY")
            }
          }
        }
        artistHighlights: highlights {
          partnersConnection(first: 1, partnerCategory: ["blue-chip"]) {
            edges {
              node {
                categories {
                  slug
                }
              }
            }
          }
        }
      }
    `,
  }
)
