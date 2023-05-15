import { Flex, Text } from "@artsy/palette"

export const EmptyArtistAuctionResults: React.FC = () => {
  return (
    <Flex>
      <Text>There are no auction results for this artist at this time.</Text>
      <Text>
        The page will be updated once auction results are added. In the
        meantime, check out the millions of auction results and art market data.
      </Text>
    </Flex>
  )
}
