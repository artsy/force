import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useStripePaymentBySetupIntentId } from "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId"
import {
  handleBackNavigation,
  preventHardReload,
} from "Apps/Order2/Utils/navigationGuards"
import createLogger from "Utils/logger"
import type { Order2CheckoutContext_order$data } from "__generated__/Order2CheckoutContext_order.graphql"
import { every } from "lodash"
import { useEffect, useRef, useState } from "react"

const logger = createLogger("useLoadCheckout.tsx")

export const MIN_LOADING_MS = 1000
export const MAX_LOADING_MS = 6000

export const useLoadCheckout = (
  orderData: Order2CheckoutContext_order$data,
) => {
  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)
  const [isStripeRedirectHandled, setIsStripeRedirectHandled] = useState(false)

  // Handle Stripe redirect and call onComplete when done
  useStripePaymentBySetupIntentId(orderData.internalID, () => {
    setIsStripeRedirectHandled(true)
  })

  const isExpressCheckoutLoaded = Order2CheckoutContext.useStoreState(state => {
    // Express Checkout is considered "loaded" if:
    // 1. It's actually loaded (not null), OR
    // 2. We're in post-payment state where Express Checkout should be hidden
    const isActuallyLoaded = state.expressCheckoutPaymentMethods !== null
    const activeStep = state.steps.find(
      step => step.state === CheckoutStepState.ACTIVE,
    )
    const isInPostPaymentState =
      activeStep?.name === CheckoutStepName.CONFIRMATION

    return isActuallyLoaded || isInPostPaymentState
  })

  const isLoading = Order2CheckoutContext.useStoreState(
    state => state.isLoading,
  )
  const criticalCheckoutError = Order2CheckoutContext.useStoreState(
    state => state.criticalCheckoutError,
  )
  const setCriticalCheckoutError = Order2CheckoutContext.useStoreActions(
    actions => actions.setCriticalCheckoutError,
  )
  const setLoadingComplete = Order2CheckoutContext.useStoreActions(
    actions => actions.setLoadingComplete,
  )

  // Scroll lock during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  // Navigation guards - prevent accidental navigation away from checkout
  // except during loading or error
  useEffect(() => {
    // Don't set up guards if there's a critical error or still loading
    if (isLoading || criticalCheckoutError) {
      return
    }

    window.addEventListener("beforeunload", preventHardReload)
    window.history.pushState(null, "", window.location.pathname)
    window.addEventListener("popstate", handleBackNavigation)

    return () => {
      window.removeEventListener("beforeunload", preventHardReload)
      window.removeEventListener("popstate", handleBackNavigation)
    }
  }, [isLoading, criticalCheckoutError])

  // If a critical error occurs, immediately remove any existing guards
  useEffect(() => {
    if (criticalCheckoutError) {
      window.removeEventListener("beforeunload", preventHardReload)
      window.removeEventListener("popstate", handleBackNavigation)
      window.onbeforeunload = null
    }
  }, [criticalCheckoutError])

  // Validate order and get into good initial checkout state on load
  useEffect(() => {
    if (orderValidated || !orderData) {
      return
    }

    try {
      validateOrder(orderData)
      setOrderValidated(true)
    } catch (error) {
      logger.error("Error validating order: ", error.message)
      setCriticalCheckoutError(error.message)
    }
  }, [orderData, orderValidated, setCriticalCheckoutError])

  // Set minimum loading duration to avoid flash of loading state
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoadingPassed(true)
    }, MIN_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  const isLoadingRef = useRef(isLoading)
  useEffect(() => {
    isLoadingRef.current = isLoading
  }, [isLoading])

  // Set timeout for maximum loading duration
  // biome-ignore lint/correctness/useExhaustiveDependencies: 1-time effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoadingRef.current) {
        const loadingState = Object.entries({
          minimumLoadingPassed,
          orderValidated,
          isExpressCheckoutLoaded,
          isStripeRedirectHandled,
        })
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ")

        const error = new Error(
          `Checkout loading state exceeded ${MAX_LOADING_MS}ms timeout: ${loadingState}`,
        )

        logger.error(error)
        setCriticalCheckoutError("loading_timeout")
      }
    }, MAX_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  // Set loading complete when all conditions are met
  useEffect(() => {
    if (!isLoading || !!criticalCheckoutError) {
      return
    }

    if (
      [
        minimumLoadingPassed,
        orderValidated,
        isExpressCheckoutLoaded,
        isStripeRedirectHandled,
        isLoading,
        setLoadingComplete,
      ].every(Boolean)
    ) {
      setLoadingComplete()
    }
  }, [
    minimumLoadingPassed,
    orderValidated,
    isExpressCheckoutLoaded,
    isStripeRedirectHandled,
    isLoading,
    setLoadingComplete,
    criticalCheckoutError,
  ])
}

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
