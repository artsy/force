import { Flex, Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightPills_artist } from "v2/__generated__/ArtistInsightPills_artist.graphql"

interface ArtistInsightPillsProps {
  artist: ArtistInsightPills_artist
}

const ARTIST_PILLS = {
  ACTIVE_SECONDARY_MARKET: {
    title: "Active Secondary Market",
  },
  BLUE_CHIP_REPRESENTATION: {
    title: "Blue Chip Representation",
  },
  CRITICALLY_ACCLAIMED: {
    title: "Critically Acclaimed",
  },
  ARTSY_VANGUARD: {
    title: "The Artsy Vanguard",
  },
  HIGH_AUCTION_RECORD: {
    title: "High Auction Record",
  },
}

interface ArtistPillProps {
  type: string
}

export const ArtistPill: FC<ArtistPillProps> = ({ type }) => {
  return (
    <Pill variant="badge" disabled mr={1}>
      {ARTIST_PILLS[type].title}
    </Pill>
  )
}

export const ArtistInsightPills: FC<ArtistInsightPillsProps> = ({ artist }) => {
  if (!artist.insights) {
    return null
  }

  if (!artist.artistHighlights) {
    return null
  }

  if (!artist.auctionResultsConnection) {
    return null
  }

  const blueChipRepresentation = extractNodes(
    artist.artistHighlights.partnersConnection
  )

  const highAuctionResults = extractNodes(artist.auctionResultsConnection)[0]

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {blueChipRepresentation?.length > 0 && (
        <ArtistPill type="BLUE_CHIP_REPRESENTATION" />
      )}
      {highAuctionResults.price_realized?.display && (
        <ArtistPill type="HIGH_AUCTION_RECORD" />
      )}

      {artist.insights.map(insight => {
        return ARTIST_PILLS[insight!.type] ? (
          <ArtistPill type={insight!.type} />
        ) : null
      })}
    </Flex>
  )
}

export const ArtistInsightPillsFragmentContainer = createFragmentContainer(
  ArtistInsightPills,
  {
    artist: graphql`
      fragment ArtistInsightPills_artist on Artist {
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
