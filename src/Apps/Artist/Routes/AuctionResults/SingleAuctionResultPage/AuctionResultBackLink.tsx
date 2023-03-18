import { ChevronIcon, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { AuctionResultBackLink_artist$data } from "__generated__/AuctionResultBackLink_artist.graphql"

interface AuctionResultBackLinkProps {
  artist: AuctionResultBackLink_artist$data
}

const AuctionResultBackLink: React.FC<AuctionResultBackLinkProps> = ({
  artist,
}) => {
  const { slug, name } = artist

  return (
    <Flex py={[2, 1]} justifyContent="space-between" alignItems="center">
      <RouterLink textDecoration="none" to={`/artist/${slug}/auction-results`}>
        <Flex alignItems="center">
          <ChevronIcon height={14} width={14} direction="left" />
          <Media greaterThanOrEqual="sm">
            <Text variant="xs" pl={1}>
              Back to {name}
            </Text>
          </Media>
        </Flex>
      </RouterLink>
    </Flex>
  )
}

export const AuctionResultBackLinkFragmentContainer = createFragmentContainer(
  AuctionResultBackLink,
  {
    artist: graphql`
      fragment AuctionResultBackLink_artist on Artist {
        name
        slug
      }
    `,
  }
)
