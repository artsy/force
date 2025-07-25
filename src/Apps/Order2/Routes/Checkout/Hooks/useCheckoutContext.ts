import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"

export const useCheckoutContext = () => {
  const state = Order2CheckoutContext.useStoreState(state => state)
  const actions = Order2CheckoutContext.useStoreActions(actions => actions)

  return { ...state, ...actions }
}
