import { Flex } from "@artsy/palette"
import React from "react"
import { Benefits } from "./Components/Benefits"
import { PriceDatabaseSearch } from "./Components/PriceDatabaseSearch"
import { PriceDatabaseMeta } from "./Components/PriceDatabaseMeta"

export const MarketingLandingApp = () => {
  return (
    <Flex maxWidth="900px" flexDirection="column" mx="auto" py={4}>
      <PriceDatabaseMeta />

      <>
        <PriceDatabaseSearch />

        <Benefits />
      </>
    </Flex>
  )
}
