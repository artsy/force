import type {
  CheckoutLoadingError,
  CheckoutStep,
  ExpressCheckoutPaymentMethod,
  FulfillmentDetailsTab,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import type {
  Order2CheckoutContext_order$data,
  Order2CheckoutContext_order$key,
} from "__generated__/Order2CheckoutContext_order.graphql"
import { every } from "lodash"
import type React from "react"
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2CheckoutContext.tsx")
const MINIMUM_LOADING_MS = 1000

interface CheckoutState {
  isLoading: boolean
  /** Order is redirecting to the details page */
  expressCheckoutSubmitting: boolean
  loadingError: CheckoutLoadingError | null
  expressCheckoutPaymentMethods: ExpressCheckoutPaymentMethod[] | null
  steps: CheckoutStep[]
  activeFulfillmentDetailsTab: FulfillmentDetailsTab | null
  confirmationToken: any
}

interface CheckoutActions {
  setActiveFulfillmentDetailsTab: (
    activeFulfillmentDetailsTab: FulfillmentDetailsTab | null,
  ) => void
  setExpressCheckoutLoaded: (
    availablePaymentMethods: ExpressCheckoutPaymentMethod[],
  ) => void
  setExpressCheckoutSubmitting: (isSubmitting: boolean) => void
  setFulfillmentDetailsComplete: (args: { isPickup: boolean }) => void
  editFulfillmentDetails: () => void
  editPayment: () => void
  setLoadingError: (error: CheckoutLoadingError | null) => void
  setLoadingComplete: () => void
  setConfirmationToken: (args: { confirmationToken: any }) => void
  redirectToOrderDetails: () => void
}

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

  const context = useBuildCheckoutContext(orderData)

  const {
    expressCheckoutPaymentMethods,
    isLoading,
    setLoadingError,
    setLoadingComplete,
  } = context

  const isExpressCheckoutLoaded = expressCheckoutPaymentMethods !== null

  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)

  const checks = [minimumLoadingPassed, orderValidated, isExpressCheckoutLoaded]

  // Validate order and get into good initial checkout state on load
  // - artwork version match
  // - any resetting
  useEffect(() => {
    if (orderValidated || !orderData) {
      return
    }

    try {
      validateOrder(orderData)
      setOrderValidated(true)
    } catch (error) {
      logger.error("Error validating order: ", error.message)
      setLoadingError(error.message)
    }
  }, [orderData, orderValidated, setLoadingError])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoadingPassed(true)
    }, MINIMUM_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (checks.every(Boolean)) {
      setLoadingComplete()
    }
  }, [...checks])

  return (
    <Order2CheckoutContext.Provider value={context}>
      {children}
    </Order2CheckoutContext.Provider>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2CheckoutContext_order on Order {
    internalID
    mode
    selectedFulfillmentOption {
      type
    }
    lineItems {
      artworkVersion {
        internalID
      }
    }
  }
`

const validateOrder = (order: Order2CheckoutContext_order$data) => {
  const hasLineItemsWithData =
    order.lineItems.length &&
    every(order.lineItems, lineItem => {
      return !!lineItem?.artworkVersion?.internalID
    })

  if (!hasLineItemsWithData) {
    throw new Error("missing_line_item_data")
  }
  return
}

const useBuildCheckoutContext = (
  orderData: Order2CheckoutContext_order$data,
): Order2CheckoutContextValue => {
  const initialState: CheckoutState = useMemo(
    () => initialStateForOrder(orderData),
    [orderData],
  )

  const { router } = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)

  const redirectToOrderDetails = useCallback(() => {
    const orderID = orderData.internalID
    const orderDetailsURL = `/orders2/${orderID}/details`

    router.replace(orderDetailsURL)
  }, [orderData.internalID, router])

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

  const setActiveFulfillmentDetailsTab = useCallback(
    (activeFulfillmentDetailsTab: "DELIVERY" | "PICKUP" | null) => {
      if (state.activeFulfillmentDetailsTab !== activeFulfillmentDetailsTab) {
        dispatch({
          type: "SET_ACTIVE_FULFILLMENT_DETAILS_TAB",
          payload: { activeFulfillmentDetailsTab },
        })
      }
    },
    [state.activeFulfillmentDetailsTab],
  )

  const setExpressCheckoutSubmitting = useCallback(
    (isSubmitting: boolean) => {
      if (state.expressCheckoutSubmitting !== isSubmitting) {
        dispatch({
          type: "SET_EXPRESS_CHECKOUT_SUBMITTING",
          payload: { isSubmittingOrder: isSubmitting },
        })
      }
    },
    [state.expressCheckoutSubmitting],
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

  const setConfirmationToken = useCallback(
    ({ confirmationToken }: { confirmationToken: any }) => {
      dispatch({
        type: "PAYMENT_COMPLETE",
        payload: { confirmationToken: confirmationToken },
      })
    },
    [],
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

  const editPayment = useCallback(() => {
    if (previousStepName !== CheckoutStepName.PAYMENT) {
      logger.error(
        `editPayment called when current step is not PAYMENT but ${previousStepName}`,
      )
      return
    }
    dispatch({
      type: "EDIT_PAYMENT",
    })
  }, [previousStepName])

  const actions = useMemo(() => {
    return {
      editFulfillmentDetails,
      editPayment,
      setActiveFulfillmentDetailsTab,
      setExpressCheckoutSubmitting,
      setExpressCheckoutLoaded,
      setFulfillmentDetailsComplete,
      setLoadingError,
      setLoadingComplete,
      setConfirmationToken,
      redirectToOrderDetails,
    }
  }, [
    editFulfillmentDetails,
    editPayment,
    setActiveFulfillmentDetailsTab,
    setExpressCheckoutLoaded,
    setFulfillmentDetailsComplete,
    setLoadingError,
    setLoadingComplete,
    setConfirmationToken,
    setExpressCheckoutSubmitting,
    redirectToOrderDetails,
  ])

  return {
    ...state,
    ...actions,
  }
}

const initialStateForOrder = (
  order: Order2CheckoutContext_order$data,
): CheckoutState => {
  const stepNamesInOrder = [
    CheckoutStepName.FULFILLMENT_DETAILS,
    CheckoutStepName.DELIVERY_OPTION,
    CheckoutStepName.PAYMENT,
    CheckoutStepName.CONFIRMATION,
  ]

  if (order.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  // For now, always start from step one, and hide the delivery option
  // step immediately if the order is pickup
  // TODO: We should probably either reset the order to step one on load
  // or set the current step based on the order data at load time
  const steps = stepNamesInOrder.map((stepName, index) => {
    if (stepName === CheckoutStepName.DELIVERY_OPTION) {
      return {
        name: stepName,
        state:
          order.selectedFulfillmentOption?.type === "PICKUP"
            ? CheckoutStepState.HIDDEN
            : CheckoutStepState.UPCOMING,
      }
    }
    return {
      name: stepName,
      state:
        index === 0 ? CheckoutStepState.ACTIVE : CheckoutStepState.UPCOMING,
    }
  })

  return {
    isLoading: true,
    expressCheckoutSubmitting: false,
    loadingError: null,
    expressCheckoutPaymentMethods: null,
    activeFulfillmentDetailsTab: null,
    confirmationToken: null,
    steps,
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
      type: "SET_EXPRESS_CHECKOUT_SUBMITTING"
      payload: { isSubmittingOrder: boolean }
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
  | {
      type: "EDIT_PAYMENT"
    }
  | {
      type: "PAYMENT_COMPLETE"
      payload: { confirmationToken: any }
    }
  | {
      type: "SET_ACTIVE_FULFILLMENT_DETAILS_TAB"
      payload: { activeFulfillmentDetailsTab: "DELIVERY" | "PICKUP" | null }
    }

const reducer = (state: CheckoutState, action: Action): CheckoutState => {
  switch (action.type) {
    case "SET_ACTIVE_FULFILLMENT_DETAILS_TAB":
      return {
        ...state,
        activeFulfillmentDetailsTab: action.payload.activeFulfillmentDetailsTab,
      }
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
          const isAfterFulfillmentDetailsStep = acc
            .map(step => step.name)
            .includes(CheckoutStepName.FULFILLMENT_DETAILS)

          if (
            isAfterFulfillmentDetailsStep &&
            current.state !== CheckoutStepState.HIDDEN
          ) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.UPCOMING,
              },
            ]
          }
          if (current.name === CheckoutStepName.FULFILLMENT_DETAILS) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.ACTIVE,
              },
            ]
          }

          return [...acc, current]
        }, [] as CheckoutStep[]),
      }

    case "FULFILLMENT_DETAILS_COMPLETE":
      const { isPickup } = action.payload
      // Update steps to mark FULFILLMENT_DETAILS as completed and remove DELIVERY_OPTION if isPickup
      let nextStepActivated = false

      return {
        ...state,
        steps: state.steps.reduce((acc, current) => {
          const isThisStep =
            current.name === CheckoutStepName.FULFILLMENT_DETAILS
          if (isThisStep) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.COMPLETED,
              },
            ]
          }

          if (current.name === CheckoutStepName.DELIVERY_OPTION) {
            if (isPickup) {
              return [...acc, { ...current, state: CheckoutStepState.HIDDEN }]
            }
          }

          // Only activate the first upcoming step after FULFILLMENT_DETAILS is completed
          if (
            !nextStepActivated &&
            current.state === CheckoutStepState.UPCOMING &&
            acc.some(
              step =>
                step.name === CheckoutStepName.FULFILLMENT_DETAILS &&
                step.state === CheckoutStepState.COMPLETED,
            )
          ) {
            nextStepActivated = true
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.ACTIVE,
              },
            ]
          }
          return [...acc, current]
        }, [] as CheckoutStep[]),
      }
    case "EDIT_PAYMENT":
      return {
        ...state,
        steps: state.steps.reduce((acc, current) => {
          const isAfterPaymentStep = acc
            .map(step => step.name)
            .includes(CheckoutStepName.PAYMENT)

          if (
            isAfterPaymentStep &&
            current.state !== CheckoutStepState.HIDDEN
          ) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.UPCOMING,
              },
            ]
          }
          if (current.name === CheckoutStepName.PAYMENT) {
            return [
              ...acc,
              {
                ...current,
                state: CheckoutStepState.ACTIVE,
              },
            ]
          }

          return [...acc, current]
        }, [] as CheckoutStep[]),
      }
    case "PAYMENT_COMPLETE":
      const newSteps = state.steps.reduce((acc, current) => {
        const isThisStep = current.name === CheckoutStepName.PAYMENT
        if (isThisStep) {
          return [
            ...acc,
            {
              ...current,
              state: CheckoutStepState.COMPLETED,
            },
          ]
        }
        const firstStepAfterCompleted =
          acc.find(step => step.state === CheckoutStepState.COMPLETED) &&
          !acc.find(step => step.state === CheckoutStepState.UPCOMING)
        if (firstStepAfterCompleted) {
          return [
            ...acc,
            {
              ...current,
              state: CheckoutStepState.ACTIVE,
            },
          ]
        }
        return [...acc, current]
      }, [] as CheckoutStep[])

      return {
        ...state,
        confirmationToken: action.payload.confirmationToken,
        steps: newSteps,
      }
    case "SET_EXPRESS_CHECKOUT_SUBMITTING":
      return {
        ...state,
        expressCheckoutSubmitting: action.payload.isSubmittingOrder,
      }
    default:
      return state
  }
}
