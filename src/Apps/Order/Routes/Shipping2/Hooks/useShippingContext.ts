import { ShippingContext } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/ShippingContext"
import { useContext } from "react"

export const useShippingContext = () => {
  return useContext(ShippingContext)
}
