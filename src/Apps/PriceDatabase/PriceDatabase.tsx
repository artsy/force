import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Separator, Spacer } from "@artsy/palette"
import { AuctionResultsFilterContextProvider } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { Media } from "Utils/Responsive"
import { useEffect } from "react"
import { useTracking } from "react-tracking"
import { PriceDatabaseBenefits } from "./Components/PriceDatabaseBenefits"
import { PriceDatabaseMeta } from "./Components/PriceDatabaseMeta"
import { PriceDatabaseSearch } from "./Components/PriceDatabaseSearch"

export const PriceDatabase = () => {
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      action: ActionType.screen,
      context_module: ContextModule.priceDatabaseLanding,
      context_screen_owner_type: OwnerType.priceDatabase,
    })
  }, [trackEvent])

  return (
    <>
      <PriceDatabaseMeta />

      <AuctionResultsFilterContextProvider>
        <Spacer y={4} />

        <PriceDatabaseSearch />

        <Media lessThan="sm">
          <Spacer y={4} />
        </Media>

        <Media greaterThanOrEqual="sm">
          <Separator my={6} />
        </Media>

        <PriceDatabaseBenefits />
      </AuctionResultsFilterContextProvider>
    </>
  )
}
