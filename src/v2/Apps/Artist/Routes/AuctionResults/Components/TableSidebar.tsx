import { Flex } from "@artsy/palette"
import React from "react"
import { AuctionFilters } from "./AuctionFilters"

export const TableSidebar = () => {
  return (
    <Flex flexDirection="column">
      <AuctionFilters />
    </Flex>
  )
}
