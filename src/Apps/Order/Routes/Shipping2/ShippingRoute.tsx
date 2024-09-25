import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping"
import { ShippingRouteWithDialog } from "Apps/Order/Routes/Shipping2"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

export const ShippingRoute = props => {
  const newShippingRoute = useFeatureFlag("refactor-shipping-route")

  if (newShippingRoute) {
    return <ShippingRouteWithDialog {...props} />
  }

  return <ShippingFragmentContainer {...props} />
}
