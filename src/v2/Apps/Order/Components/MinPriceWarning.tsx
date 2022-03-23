import { Message, Text } from "@artsy/palette"
import { useEffect } from "react"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"

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
      action_type: AnalyticsSchema.ActionType.ViewedOfferTooLow,
      flow: AnalyticsSchema.Flow.MakeOffer,
      order_id: orderID,
    })
  }, [orderID, tracking])

  return (
    <Message variant="warning" p={2}>
      <Text>
        {isPriceRange
          ? "Offers lower than the displayed price range are often declined. "
          : "Offers less than 20% of the list price are often declined. "}
        We recommend changing your offer to {minPrice}.
      </Text>
    </Message>
  )
}
