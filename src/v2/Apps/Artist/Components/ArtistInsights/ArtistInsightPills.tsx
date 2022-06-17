import { Flex, Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightPills_artist } from "v2/__generated__/ArtistInsightPills_artist.graphql"

interface ArtistInsightPillsProps {
  artist: ArtistInsightPills_artist
}

interface ArtistPillProps {
  label: string
}

export const ArtistPill: FC<ArtistPillProps> = ({ label }) => {
  return (
    <Pill variant="badge" disabled mr={1}>
      {label}
    </Pill>
  )
}

export const ArtistInsightPills: FC<ArtistInsightPillsProps> = ({ artist }) => {
  if (!artist.insightsList) {
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
        <ArtistPill label="Blue Chip Representation" />
      )}
      {highAuctionResults.price_realized?.display && (
        <ArtistPill label="High Auction Record" />
      )}

      {/* TODO: uncomment once new artist metadata is imported into gravity i.e. active_secondary_market */}
      {/* {artist.insightsList.map(insight => {
        return <ArtistPill label={insight.label} />
      })} */}
    </Flex>
  )
}

export const ArtistInsightPillsFragmentContainer = createFragmentContainer(
  ArtistInsightPills,
  {
    artist: graphql`
      fragment ArtistInsightPills_artist on Artist {
        insightsList: insights(kind: [ACTIVE_SECONDARY_MARKET]) {
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
