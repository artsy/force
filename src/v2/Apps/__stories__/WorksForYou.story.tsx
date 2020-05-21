import { Box } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { WorksForYou } from "v2/Apps/WorksForYou"
import { SystemContextProvider } from "v2/Artsy"
import React from "react"
import { MarketingHeader } from "../WorksForYou/MarketingHeader"

storiesOf("Apps/Works For You", module).add("Marketing Header", () => {
  return <MarketingHeader />
})

storiesOf("Apps/Works For You/Feed", module).add(
  "Including for sale works",
  () => {
    return (
      <Box p={6} pt={2}>
        <SystemContextProvider>
          <WorksForYou />
        </SystemContextProvider>
      </Box>
    )
  }
)

storiesOf("Apps/Works For You/Feed", module).add("All", () => {
  return (
    <Box p={6} pt={2}>
      <SystemContextProvider>
        <WorksForYou forSale={false} />
      </SystemContextProvider>
    </Box>
  )
})

storiesOf("Apps/Works For You/Selected Artist Feed", module).add(
  "Including for sale works",
  () => {
    return (
      <Box p={6} pt={2}>
        <SystemContextProvider>
          <WorksForYou artistID={"rosemarie-trockel"} />
        </SystemContextProvider>
      </Box>
    )
  }
)

storiesOf("Apps/Works For You/Selected Artist Feed", module).add("All", () => {
  return (
    <Box p={6} pt={2}>
      <SystemContextProvider>
        <WorksForYou forSale={false} artistID={"pablo-picasso"} />
      </SystemContextProvider>
    </Box>
  )
})
