import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"

export function useCheckoutContext() {
  const state = Order2CheckoutContext.useStoreState(state => state)
  const actions = Order2CheckoutContext.useStoreActions(actions => actions)

  // Return the combined state and actions to match the original interface
  return {
    ...state,
    ...actions,
  }
}
