import { Message } from "@artsy/palette"
import { useEffect } from "react"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"

interface MinPriceWarningProps {
  isPriceRange: boolean
  minPrice: string
  orderID: string
}

export const MinPriceWarning: React.FC<MinPriceWarningProps> = ({
  isPriceRange,
  minPrice,
  orderID,
}) => {
  const tracking = useTracking()
  useEffect(() => {
    tracking.trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.ViewedOfferTooLow,
      flow: DeprecatedAnalyticsSchema.Flow.MakeOffer,
      order_id: orderID,
    })
  }, [orderID, tracking])

  return (
    <Message variant="warning" mt={2}>
      {isPriceRange
        ? "Offers lower than the displayed price range are often declined. "
        : "Offers less than 20% off the list price are often declined. "}
      We recommend increasing your offer to {minPrice}.
    </Message>
  )
}
