import { ShippingContext } from "Apps/Order/Routes/Shipping/ShippingContext"
import { useContext } from "react"

export const useShippingContext = () => {
  return useContext(ShippingContext)
}
