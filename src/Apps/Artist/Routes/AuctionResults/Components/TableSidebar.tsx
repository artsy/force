import { Flex } from "@artsy/palette"
import { AuctionFilters } from "./AuctionFilters"

export const TableSidebar: React.FC<{
  showUpcomingAuctionResults: boolean
}> = ({ showUpcomingAuctionResults }) => {
  return (
    <Flex flexDirection="column">
      <AuctionFilters showUpcomingAuctionResults={showUpcomingAuctionResults} />
    </Flex>
  )
}
