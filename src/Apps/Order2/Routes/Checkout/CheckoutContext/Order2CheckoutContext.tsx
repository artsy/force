import type {
  CheckoutActions,
  CheckoutLoadingError,
  CheckoutState,
  CheckoutStep,
  ExpressCheckoutPaymentMethod,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import createLogger from "Utils/logger"
import type {
  Order2CheckoutContext_order$data,
  Order2CheckoutContext_order$key,
} from "__generated__/Order2CheckoutContext_order.graphql"
import type React from "react"
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2CheckoutContext.tsx")

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

  const { state, actions } = useCheckoutActions(initialState)

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

  // For now, always start from step one
  // TODO: We should probably either reset the order to step one on load
  // or set the current step based on the order data at load time
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

interface UseCheckoutActionsValue {
  state: CheckoutState
  actions: CheckoutActions
  // Actions only used by the useLoadCheckout hook
}

const useCheckoutActions = (
  initialState: CheckoutState,
): UseCheckoutActionsValue => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setExpressCheckoutLoaded = useCallback(
    (availablePaymentMethods: ExpressCheckoutPaymentMethod[]) => {
      if (state.isLoading && state.expressCheckoutPaymentMethods === null) {
        dispatch({
          type: "SET_EXPRESS_CHECKOUT_LOADED",
          payload: { expressCheckoutPaymentMethods: availablePaymentMethods },
        })
      }
    },
    [state.isLoading, state.expressCheckoutPaymentMethods],
  )

  // This used only by the useLoadCheckout hook
  const setLoadingError = useCallback((error: CheckoutLoadingError | null) => {
    dispatch({
      type: "SET_LOADING_ERROR",
      payload: { loadingError: error },
    })
  }, [])

  const setLoadingComplete = useCallback(() => {
    dispatch({ type: "LOADING_COMPLETE" })
  }, [])

  const currentStepName = state.steps.find(
    step => step.state === CheckoutStepState.ACTIVE,
  )?.name

  const previousStepName = state.steps.reduce(
    (acc, current) => {
      if (current.state === CheckoutStepState.ACTIVE) {
        return acc
      }
      if (current.state === CheckoutStepState.COMPLETED) {
        return current.name
      }
      return acc
    },
    null as CheckoutStepName | null,
  )

  const setFulfillmentDetailsComplete = useCallback(
    ({ isPickup }: { isPickup: boolean }) => {
      if (currentStepName !== CheckoutStepName.FULFILLMENT_DETAILS) {
        logger.error(
          `setFulfillmentDetailsComplete called when current step is not FULFILLMENT_DETAILS but ${currentStepName}`,
        )
        return
      }
      dispatch({
        type: "FULFILLMENT_DETAILS_COMPLETE",
        payload: { isPickup },
      })
    },
    [currentStepName],
  )

  const editFulfillmentDetails = useCallback(() => {
    if (previousStepName !== CheckoutStepName.FULFILLMENT_DETAILS) {
      logger.error(
        `editFulfillmentDetails called when previous step is not FULFILLMENT_DETAILS but ${previousStepName}`,
      )
      return
    }
    dispatch({
      type: "EDIT_FULFILLMENT_DETAILS",
    })
  }, [previousStepName])

  const actions = useMemo(() => {
    return {
      setExpressCheckoutLoaded,
      setFulfillmentDetailsComplete,
      editFulfillmentDetails,
      setLoadingError,
      setLoadingComplete,
    }
  }, [
    setExpressCheckoutLoaded,
    setFulfillmentDetailsComplete,
    editFulfillmentDetails,
    setLoadingError,
    setLoadingComplete,
  ])

  return {
    state,
    actions,
  }
}

type Action =
  | {
      type: "SET_EXPRESS_CHECKOUT_LOADED"
      payload: { expressCheckoutPaymentMethods: ExpressCheckoutPaymentMethod[] }
    }
  | {
      type: "SET_LOADING_ERROR"
      payload: { loadingError: CheckoutLoadingError | null }
    }
  | {
      type: "LOADING_COMPLETE"
    }
  | {
      type: "FULFILLMENT_DETAILS_COMPLETE"
      payload: {
        isPickup: boolean
      }
    }
  | {
      type: "EDIT_FULFILLMENT_DETAILS"
    }

const reducer = (state: CheckoutState, action: Action): CheckoutState => {
  switch (action.type) {
    case "SET_EXPRESS_CHECKOUT_LOADED":
      return {
        ...state,
        expressCheckoutPaymentMethods:
          action.payload.expressCheckoutPaymentMethods,
      }
    case "SET_LOADING_ERROR":
      return {
        ...state,
        loadingError: action.payload.loadingError,
      }
    case "LOADING_COMPLETE":
      return {
        ...state,
        isLoading: false,
      }
    case "EDIT_FULFILLMENT_DETAILS":
      return {
        ...state,
        steps: state.steps.reduce((acc, current) => {
          if (current.name === CheckoutStepName.FULFILLMENT_DETAILS) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.ACTIVE,
              },
            ]
          }
          if (
            acc
              .map(step => step.name)
              .includes(CheckoutStepName.FULFILLMENT_DETAILS)
          ) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.UPCOMING,
              },
            ]
          }
          return [...acc, current]
        }, [] as CheckoutStep[]),
      }

    case "FULFILLMENT_DETAILS_COMPLETE":
      const { isPickup } = action.payload
      // Update steps to mark FULFILLMENT_DETAILS as completed and remove DELIVERY_OPTION if isPickup
      return {
        ...state,
        steps: state.steps.reduce((acc, current) => {
          if (current.name === CheckoutStepName.FULFILLMENT_DETAILS) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.COMPLETED,
              },
            ]
          }
          if (isPickup && current.name === CheckoutStepName.DELIVERY_OPTION) {
            return [...acc]
          }
          return [...acc, current]
        }, [] as CheckoutStep[]),
      }
    default:
      return state
  }
}
