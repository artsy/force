import { useCheckoutActions } from "Apps/Order2/Routes/Checkout/CheckoutContext/Hooks/useCheckoutActions"
import { useLoadCheckout } from "Apps/Order2/Routes/Checkout/CheckoutContext/Hooks/useLoadCheckout"
import type {
  CheckoutActions,
  CheckoutState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/utils"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/utils"
import type {
  Order2CheckoutContext_order$data,
  Order2CheckoutContext_order$key,
} from "__generated__/Order2CheckoutContext_order.graphql"
import type React from "react"
import { createContext, useEffect, useMemo } from "react"
import { graphql, useFragment } from "react-relay"

export type Order2CheckoutContextValue = CheckoutState & CheckoutActions

export const Order2CheckoutContext =
  createContext<Order2CheckoutContextValue | null>(null)

interface Order2CheckoutContextProviderProps {
  order: Order2CheckoutContext_order$key
  children: React.ReactNode
}

export const Order2CheckoutContextProvider: React.FC<
  Order2CheckoutContextProviderProps
> = ({ order, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const initialState: CheckoutState = useMemo(
    () => initialStateForOrder(orderData),
    [orderData],
  )

  const { setLoadingError, setLoadingComplete, state, actions } =
    useCheckoutActions(initialState)

  const isExpressCheckoutLoaded = state.expressCheckoutPaymentMethods !== null

  useLoadCheckout({
    order: orderData,
    setLoadingError,
    setLoadingComplete,
    isExpressCheckoutLoaded,
    isLoading: state.isLoading,
    loadingError: state.loadingError,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    // TODO: Pass to express checkout so it can register when it has loaded
    // for now we simulate it taking a little longer than the minimum
    // (this useEffect is temporary)
    const expressCheckoutTimeout = setTimeout(() => {
      actions.setExpressCheckoutLoaded([])
    }, 2000)

    return () => {
      clearTimeout(expressCheckoutTimeout)
    }
  }, [])

  const value: Order2CheckoutContextValue = useMemo(() => {
    return {
      ...state,
      ...actions,
    }
  }, [state, actions])

  return (
    <Order2CheckoutContext.Provider value={value}>
      {children}
    </Order2CheckoutContext.Provider>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2CheckoutContext_order on Order {
    ...useLoadCheckout_order
    mode
  }
`

const initialStateForOrder = (order: Order2CheckoutContext_order$data) => {
  const stepNamesInOrder = [
    CheckoutStepName.FULFILLMENT_DETAILS,
    CheckoutStepName.DELIVERY_OPTION,
    CheckoutStepName.PAYMENT,
    CheckoutStepName.CONFIRMATION,
  ]

  if (order.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  const steps = stepNamesInOrder.map((stepName, index) => {
    return {
      name: stepName,
      state:
        index === 0 ? CheckoutStepState.ACTIVE : CheckoutStepState.UPCOMING,
    }
  })
  return {
    isLoading: true,
    loadingError: null,
    expressCheckoutPaymentMethods: null,
    steps,
  }
}
