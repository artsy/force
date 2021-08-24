import { Flex, Separator, Spacer } from "@artsy/palette"
import React from "react"
import { PriceDatabaseBenefits } from "./Components/PriceDatabaseBenefits"
import { PriceDatabaseSearch } from "./Components/PriceDatabaseSearch"
import { PriceDatabaseMeta } from "./Components/PriceDatabaseMeta"
import { AuctionResultsFilterContextProvider } from "v2/Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { Media } from "v2/Utils/Responsive"

export const PriceDatabase = () => {
  return (
    <AuctionResultsFilterContextProvider>
      <Flex maxWidth="900px" flexDirection="column" mx="auto" py={[0, 4]}>
        <PriceDatabaseMeta />

        <PriceDatabaseSearch />
        <Media lessThan="sm">
          <Spacer mt={4} />
        </Media>
        <Media greaterThanOrEqual="sm">
          <Separator mt={4} />
        </Media>
        <PriceDatabaseBenefits />
      </Flex>
    </AuctionResultsFilterContextProvider>
  )
}
