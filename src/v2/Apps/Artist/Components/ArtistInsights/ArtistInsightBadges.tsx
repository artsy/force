import {
  BlueChipIcon,
  Box,
  Column,
  CSSGrid,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistInsightBadges_artist } from "v2/__generated__/ArtistInsightBadges_artist.graphql"

interface ArtistInsightBadgesProps {
  artist: ArtistInsightBadges_artist
}

interface ArtistBadgeProps {
  label: string
  description?: string
}

export const ArtistBadge: FC<ArtistBadgeProps> = ({ label, description }) => {
  return (
    <CSSGrid gridTemplateColumns="auto 1fr" gridTemplateRows="auto 1fr">
      <Box
        style={{ gridArea: "1 / 1 / 2 / 2" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <BlueChipIcon mr={0.5} fill="blue100" />
      </Box>
      <Text
        variant="sm"
        color="blue100"
        style={{ gridArea: "1 / 2 / 2 / 3" }}
        display="flex"
        alignItems="center"
      >
        {label}
      </Text>
      <Text color="black60" style={{ gridArea: "2 / 2 / 3 / 3" }}>
        {description}
      </Text>
    </CSSGrid>
  )
}

export const ArtistInsightBadges: FC<ArtistInsightBadgesProps> = ({
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

  const highAuctionResult = extractNodes(artist.auctionResultsConnection)[0]
  const highAuctionRecord = highAuctionResult
    ? `${highAuctionResult.price_realized?.display}, ${highAuctionResult.organization}, ${highAuctionResult.sale_date}`
    : null

  return (
    <>
      <Text variant="lg-display" color="black100">
        Artist Badges
      </Text>
      <Spacer mb={4} />
      <GridColumns>
        {blueChipRepresentation.length > 0 && (
          <Column span={6}>
            <ArtistBadge
              label="Blue Chip Representation"
              description="Represented by internationally reputable galleries."
            />
          </Column>
        )}
        {highAuctionRecord && (
          <Column span={6}>
            <ArtistBadge
              label="High Auction Record"
              description={highAuctionRecord}
            />
          </Column>
        )}

        {artist.insights.map(insight => {
          return (
            <ArtistBadge
              label={insight.label}
              description={insight.description!}
            />
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
        insights(kind: [ACTIVE_SECONDARY_MARKET]) {
          type
          label
          entities
          kind
          description
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
