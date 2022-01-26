import { Clickable, Message } from "@artsy/palette"
import { useEffect } from "react"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"

interface MinPriceWarningProps {
  isPriceRange: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  minPrice: string
  orderID: string
}

export const MinPriceWarning: React.FC<MinPriceWarningProps> = ({
  onClick,
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
  }, [])

  return (
    <Message variant="default" p={2} mt={2}>
      Galleries usually accept offers within
      {isPriceRange ? " the displayed price range" : " 20% of the listed price"}
      ; any lower is likely to be rejected.
      <br />
      <Clickable textDecoration="underline" cursor="pointer" onClick={onClick}>
        We recommend changing your offer to {minPrice}.
      </Clickable>
    </Message>
  )
}
