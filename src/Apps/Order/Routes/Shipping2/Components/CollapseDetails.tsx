import { Collapse } from "Apps/Order/Components/Collapse"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import React from "react"

export const CollapseDetails: React.FC = ({ children }) => {
  const shippingContext = useShippingContext()

  const showArtsyShipping =
    shippingContext.state.stage === "shipping_quotes" &&
    !!shippingContext.orderData.savedFulfillmentDetails?.isArtsyShipping &&
    !!shippingContext.orderData.shippingQuotes &&
    shippingContext.orderData.shippingQuotes.length > 0

  return (
    <Collapse data-testid="ShippingQuotes_collapse" open={showArtsyShipping}>
      {children}
    </Collapse>
  )
}
