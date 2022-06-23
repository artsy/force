import { Flex, Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightPills_artist } from "v2/__generated__/ArtistInsightPills_artist.graphql"

interface ArtistInsightPillsProps {
  artist: ArtistInsightPills_artist
}

export const ArtistInsightPills: FC<ArtistInsightPillsProps> = ({ artist }) => {
  const blueChipRepresentation = extractNodes(
    artist.artistHighlights?.partnersConnection
  )

  // The first result is the highest auction result
  const highAuctionResults = extractNodes(artist.auctionResultsConnection)[0]

  if (
    artist.insightsList.length == 0 ||
    !artist.artistHighlights ||
    !artist.auctionResultsConnection
  ) {
    return null
  }

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {blueChipRepresentation?.length > 0 && (
        <ArtistPill label="Blue Chip Representation" />
      )}
      {highAuctionResults.priceRealized?.display && (
        <ArtistPill label="High Auction Record" />
      )}

      {artist.insightsList.map(insight => {
        return <ArtistPill key={insight.kind!} label={insight.label} />
      })}
    </Flex>
  )
}

export const ArtistInsightPillsFragmentContainer = createFragmentContainer(
  ArtistInsightPills,
  {
    artist: graphql`
      fragment ArtistInsightPills_artist on Artist {
        insightsList: insights(kind: [ACTIVE_SECONDARY_MARKET]) {
          kind
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
              priceRealized {
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
