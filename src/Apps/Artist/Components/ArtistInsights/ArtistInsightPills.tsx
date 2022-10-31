import { Flex, Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistInsightPills_artist$data } from "__generated__/ArtistInsightPills_artist.graphql"
import { useJump } from "Utils/Hooks/useJump"

interface ArtistInsightPillsProps {
  artist: ArtistInsightPills_artist$data
}

export const ArtistInsightPills: FC<ArtistInsightPillsProps> = ({ artist }) => {
  const { jumpTo } = useJump({ behavior: "smooth", offset: 10 })

  const handleClick = () => {
    jumpTo("ArtistCareerHighlights")
  }

  if (artist.insightPills.length === 0) {
    return null
  }

  return (
    <Flex flexDirection="row" flexWrap="wrap" mb={-1}>
      {artist.insightPills.map(insight => {
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
    </Flex>
  )
}

export const ArtistInsightPillsFragmentContainer = createFragmentContainer(
  ArtistInsightPills,
  {
    artist: graphql`
      fragment ArtistInsightPills_artist on Artist {
        insightPills: insights(
          kind: [
            ACTIVE_SECONDARY_MARKET
            HIGH_AUCTION_RECORD
            ARTSY_VANGUARD_YEAR
            CRITICALLY_ACCLAIMED
          ]
        ) {
          kind
          label
        }
      }
    `,
  }
)
