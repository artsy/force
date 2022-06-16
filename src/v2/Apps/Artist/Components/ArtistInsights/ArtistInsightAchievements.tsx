import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Column, GridColumns, Text } from "@artsy/palette"
import { ArtistInsightAchievements_artist } from "v2/__generated__/ArtistInsightAchievements_artist.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"

interface ArtistInsightAchievementsProps {
  artist: ArtistInsightAchievements_artist
}

interface ArtistAchievementProps {
  type: string
  description?: string
}

export const ArtistAchievement: FC<ArtistAchievementProps> = ({
  type,
  description,
}) => {
  return <h1>Artist Achievement</h1>
}

export const ArtistInsightAchievements: FC<ArtistInsightAchievementsProps> = ({
  artist,
}) => {
  if (!artist.achievements) {
    return null
  }

  return (
    <>
      <Text variant="lg">Career Highlights</Text>
      <GridColumns gridColumnGap={[2, 4]} gridColumn={[1, 2]}>
        <Column>Column</Column>
        <Column>Column</Column>
      </GridColumns>
      <RouterLink to={`${artist.slug}/cv`}>
        See all past shows and fair booths
      </RouterLink>
    </>
  )
}

export const ArtistInsightAchievementsFragmentContainer = createFragmentContainer(
  ArtistInsightAchievements,
  {
    artist: graphql`
      fragment ArtistInsightAchievements_artist on Artist {
        slug
        achievements: insights(
          kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]
        ) {
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
