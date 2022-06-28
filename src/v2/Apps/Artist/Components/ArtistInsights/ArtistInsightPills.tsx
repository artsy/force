import { Flex, Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightPills_artist } from "v2/__generated__/ArtistInsightPills_artist.graphql"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"

interface ArtistInsightPillsProps {
  artist: ArtistInsightPills_artist
}

export const ArtistInsightPills: FC<ArtistInsightPillsProps> = ({ artist }) => {
  const { scrollTo } = useScrollTo({ behavior: "smooth" })
  const handleClick = () => {
    scrollTo("#jump--artistCareerHighlights")
  }

  // The first result is the highest auction result
  const highAuctionResult = extractNodes(artist.auctionResultsConnection)[0]

  if (artist.insightsList.length === 0 && !highAuctionResult) {
    return null
  }

  return (
    <Flex flexDirection="row" flexWrap="wrap" mb={-1}>
      {artist.insightsList.map(insight => {
        return (
          <Pill
            variant="badge"
            mr={1}
            mb={1}
            key={insight.kind!}
            onClick={handleClick}
          >
            {insight.label}
          </Pill>
        )
      })}

      {highAuctionResult?.priceRealized?.display && (
        <Pill variant="badge" mr={1} mb={1} onClick={handleClick}>
          High Auction Record
        </Pill>
      )}
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
      }
    `,
  }
)
