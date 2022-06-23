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

export const ArtistInsightBadges: FC<ArtistInsightBadgesProps> = ({
  artist,
}) => {
  const blueChipRepresentation = extractNodes(
    artist.artistHighlights?.partnersConnection
  )

  // The first result is the highest auction result
  const highAuctionResult = extractNodes(artist.auctionResultsConnection)[0]
  const highAuctionRecord = highAuctionResult
    ? `${highAuctionResult.priceRealized?.display}, ${highAuctionResult.organization}, ${highAuctionResult.saleDate}`
    : null

  if (
    artist.insights.length === 0 &&
    !artist.artistHighlights &&
    !artist.auctionResultsConnection
  ) {
    return null
  }

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
              // TODO: Mark kind as non-nullable
              key={insight.kind!}
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

      <Text variant="sm" color="black60" style={{ gridArea: "2 / 2 / 3 / 3" }}>
        {description}
      </Text>
    </CSSGrid>
  )
}
