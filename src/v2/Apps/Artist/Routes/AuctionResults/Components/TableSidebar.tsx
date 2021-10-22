import { Flex } from "@artsy/palette"
import { AuctionFilters } from "./AuctionFilters"

export const TableSidebar = () => {
  return (
    <Flex flexDirection="column">
      <AuctionFilters />
    </Flex>
  )
}
