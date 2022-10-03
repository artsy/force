import { Flex, Pill, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistInsightPills_artist } from "__generated__/ArtistInsightPills_artist.graphql"
import { useScrollTo } from "Utils/Hooks/useScrollTo"

interface ArtistInsightPillsProps {
  artist: ArtistInsightPills_artist
}

export const ArtistInsightPills: FC<ArtistInsightPillsProps> = ({ artist }) => {
  const { scrollTo } = useScrollTo({ behavior: "smooth" })
  const handleClick = () => {
    scrollTo("#jump--artistCareerHighlights")
  }

  if (artist.insightPills.length === 0) {
    return null
  }

  return (
    <>
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
      <Spacer mb={4} />
    </>
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
