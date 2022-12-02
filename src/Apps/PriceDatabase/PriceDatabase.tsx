import { Flex, Separator, Spacer } from "@artsy/palette"
import { useEffect } from "react"
import { useTracking } from "react-tracking"
import { PriceDatabaseBenefits } from "./Components/PriceDatabaseBenefits"
import { PriceDatabaseSearch } from "./Components/PriceDatabaseSearch"
import { PriceDatabaseMeta } from "./Components/PriceDatabaseMeta"
import { AuctionResultsFilterContextProvider } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { Media } from "Utils/Responsive"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"

export const PriceDatabase = () => {
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      action: ActionType.screen,
      context_module: ContextModule.priceDatabaseLanding,
      context_screen_owner_type: OwnerType.priceDatabase,
    })
  }, [])

  return (
    <AuctionResultsFilterContextProvider>
      <Flex flexDirection="column" mx="auto" py={[0, 4]}>
        <PriceDatabaseMeta />

        <PriceDatabaseSearch />

        <Media lessThan="sm">
          <Spacer y={4} />
        </Media>
        <Media greaterThanOrEqual="sm">
          <Separator mt={4} />
        </Media>

        <PriceDatabaseBenefits />
      </Flex>
    </AuctionResultsFilterContextProvider>
  )
}
