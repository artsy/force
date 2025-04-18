import { Flex } from "@artsy/palette"
import { AuctionFilters } from "./AuctionFilters"

export const TableSidebar: React.FC<
  React.PropsWithChildren<{
    showUpcomingAuctionResults: boolean
  }>
> = ({ showUpcomingAuctionResults }) => {
  return (
    <Flex flexDirection="column">
      <AuctionFilters showUpcomingAuctionResults={showUpcomingAuctionResults} />
    </Flex>
  )
}
