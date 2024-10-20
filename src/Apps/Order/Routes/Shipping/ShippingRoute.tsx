import { ShippingRouteWithDialog } from "Apps/Order/Routes/Shipping"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

export const ShippingRoute = props => {
  return <ShippingRouteWithDialog {...props} />
}
