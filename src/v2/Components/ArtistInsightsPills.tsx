import { Flex, Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightsPills_artist } from "v2/__generated__/ArtistInsightsPills_artist.graphql"

interface ArtistInsightsPillsProps {
  artist: ArtistInsightsPills_artist
}

const ARTIST_PILLS_TEMPLATE = {
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
  pillType: string
}

export const ArtistPill: FC<ArtistPillProps> = ({ pillType }) => {
  return (
    <Pill variant="badge" disabled>
      {ARTIST_PILLS_TEMPLATE[pillType].title}
    </Pill>
  )
}

export const ArtistInsightsPills: FC<ArtistInsightsPillsProps> = ({
  artist,
}) => {
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
        <ArtistPill pillType="BLUE_CHIP_REPRESENTATION" />
      )}
      {highAuctionResults.price_realized?.display && (
        <ArtistPill pillType="HIGH_AUCTION_RECORD" />
      )}
    </Flex>
  )
}

export const ArtistInsightsPillsFragmentContainer = createFragmentContainer(
  ArtistInsightsPills,
  {
    artist: graphql`
      fragment ArtistInsightsPills_artist on Artist {
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
