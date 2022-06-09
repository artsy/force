import { Text } from "@artsy/palette"
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
}

interface ArtistBadgeProps {
  badgeType: string
}

export const ArtistBadge: FC<ArtistBadgeProps> = ({ badgeType }) => {
  const title = ARTIST_BADGES_TEMPLATE[badgeType].title
  const description = ARTIST_BADGES_TEMPLATE[badgeType].description

  return (
    <div>
      <h1>{title}</h1>
      <Text>{description}</Text>
    </div>
  )
}

export const ArtistInsightsBadges: FC<ArtistInsightsBadgesProps> = ({
  artist,
}) => {
  if (!artist.insights || !artist.artistHighlights) return null

  const blueChipRepresentation = extractNodes(
    artist.artistHighlights.partnersConnection
  )

  return (
    <div>
      <h1>Artist Badges</h1>
      {blueChipRepresentation.length > 0 && (
        <ArtistBadge badgeType="BLUE_CHIP_REPRESENTATION" />
      )}
      {/* {artist.insights.map(insight => {
        if (insight?.type) {
          return <ArtistBadge badgeType={insight.type} />
        }
      })} */}
      <ArtistBadge badgeType="ACTIVE_SECONDARY_MARKET" />
    </div>
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
