import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { useContext } from "react"

export function useCheckoutContext() {
  const ctx = useContext(Order2CheckoutContext)
  if (!ctx)
    throw new Error(
      "useCheckoutContext must be used within a Order2CheckoutContextProvider",
    )
  return ctx
}
