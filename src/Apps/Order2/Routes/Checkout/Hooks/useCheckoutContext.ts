import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutContext"
import { useContext } from "react"

export function useCheckoutContext() {
  const ctx = useContext(Order2CheckoutContext)
  // TODO: Uncomment this when the checkout context is guaranteed
  // to be available. For now we need it for the shared express checkout in
  // the legacy shipping step.
  // if (!ctx)
  //   throw new Error(
  //     "useCheckoutContext must be used within a Order2CheckoutContextProvider",
  //   )
  return ctx
}
