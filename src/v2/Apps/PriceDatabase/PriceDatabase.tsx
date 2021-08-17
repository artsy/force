import { Flex, Separator, Spacer, themeProps } from "@artsy/palette"
import React from "react"
import { PriceDatabaseBenefits } from "./Components/PriceDatabaseBenefits"
import { PriceDatabaseSearch } from "./Components/PriceDatabaseSearch"
import { PriceDatabaseMeta } from "./Components/PriceDatabaseMeta"
import { AuctionResultsFilterContextProvider } from "v2/Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

export const PriceDatabase = () => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  return (
    <AuctionResultsFilterContextProvider>
      <Flex maxWidth="900px" flexDirection="column" mx="auto" py={[0, 4]}>
        <PriceDatabaseMeta />

        <PriceDatabaseSearch />
        {isMobile ? <Spacer mt={4} /> : <Separator mt={4} />}
        <PriceDatabaseBenefits />
      </Flex>
    </AuctionResultsFilterContextProvider>
  )
}
