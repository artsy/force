import type {
  CheckoutActions,
  CheckoutLoadingError,
  CheckoutState,
  CheckoutStep,
  ExpressCheckoutPaymentMethod,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/utils"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/utils"
import createLogger from "Utils/logger"
import { useCallback, useMemo, useReducer } from "react"

const logger = createLogger("useCheckoutActions.tsx")

interface UseCheckoutActionsValue {
  state: CheckoutState
  actions: CheckoutActions
  // Actions only used by the useLoadCheckout hook
  setLoadingError: (error: CheckoutLoadingError | null) => void
  setLoadingComplete: () => void
}

export const useCheckoutActions = (
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
    }
  }, [
    setExpressCheckoutLoaded,
    setFulfillmentDetailsComplete,
    editFulfillmentDetails,
  ])

  return {
    setLoadingError,
    setLoadingComplete,
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
