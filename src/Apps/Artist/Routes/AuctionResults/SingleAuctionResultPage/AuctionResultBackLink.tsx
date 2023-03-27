import { ChevronIcon, Flex, Text } from "@artsy/palette"
import { AuctionResultBackLink_auctionResult$key } from "__generated__/AuctionResultBackLink_auctionResult.graphql"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"

interface AuctionResultBackLinkProps {
  auctionResult: AuctionResultBackLink_auctionResult$key
}

export const AuctionResultBackLink: React.FC<AuctionResultBackLinkProps> = ({
  auctionResult,
}) => {
  const { artist } = useFragment(auctionResultBackLinkFragment, auctionResult)

  const { slug, name } = artist!

  return (
    <Flex py={[2, 1]} justifyContent="space-between" alignItems="center">
      <RouterLink textDecoration="none" to={`/artist/${slug}/auction-results`}>
        <Flex alignItems="center" minHeight={30}>
          <ChevronIcon height={14} width={14} direction="left" />
          <Text variant="xs" pl={1}>
            <Media greaterThan="xs">Back to {name}</Media>
            <Media lessThan="sm">{name}</Media>
          </Text>
        </Flex>
      </RouterLink>
    </Flex>
  )
}

const auctionResultBackLinkFragment = graphql`
  fragment AuctionResultBackLink_auctionResult on AuctionResult {
    artist {
      name
      slug
    }
  }
`
