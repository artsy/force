import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useStripePaymentBySetupIntentId } from "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId"
import {
  handleBackNavigation,
  preventHardReload,
} from "Apps/Order2/Utils/navigationGuards"
import createLogger from "Utils/logger"
import type {
  useLoadCheckout_order$data,
  useLoadCheckout_order$key,
} from "__generated__/useLoadCheckout_order.graphql"

import { every } from "lodash"
import { useEffect, useRef, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("useLoadCheckout.tsx")

export const MIN_LOADING_MS = 1000
export const MAX_LOADING_MS = 6000

export const useLoadCheckout = (order: useLoadCheckout_order$key) => {
  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)
  const [isStripeRedirectHandled, setIsStripeRedirectHandled] = useState(false)
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const {
    isLoading,
    setLoadingComplete,
    expressCheckoutPaymentMethods,
    steps,
  } = useCheckoutContext()

  const { checkoutModalError, showCheckoutErrorModal } = useCheckoutModal()

  // Handle Stripe redirect and call onComplete when done
  useStripePaymentBySetupIntentId(orderData.internalID, () => {
    setIsStripeRedirectHandled(true)
  })

  // Express Checkout is considered "loaded" if:
  // 1. It's actually loaded (not null), OR
  // 2. We're in post-payment state where Express Checkout should be hidden
  const expressCheckoutPaymentMethodsReady =
    expressCheckoutPaymentMethods !== null
  const activeStep = steps.find(step => step.state === CheckoutStepState.ACTIVE)
  const isInPostPaymentState =
    activeStep?.name === CheckoutStepName.CONFIRMATION

  const isExpressCheckoutLoaded =
    expressCheckoutPaymentMethodsReady || isInPostPaymentState

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
    if (isLoading || checkoutModalError) {
      return
    }

    window.addEventListener("beforeunload", preventHardReload)
    window.history.pushState(null, "", window.location.pathname)
    window.addEventListener("popstate", handleBackNavigation)

    return () => {
      window.removeEventListener("beforeunload", preventHardReload)
      window.removeEventListener("popstate", handleBackNavigation)
    }
  }, [isLoading, checkoutModalError])

  // If a critical error occurs, immediately remove any existing guards
  useEffect(() => {
    if (checkoutModalError) {
      window.removeEventListener("beforeunload", preventHardReload)
      window.removeEventListener("popstate", handleBackNavigation)
      window.onbeforeunload = null
    }
  }, [checkoutModalError])

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
      showCheckoutErrorModal({
        error: error.message,
      })
    }
  }, [orderData, orderValidated, showCheckoutErrorModal])

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

  const loadingErrorRef = useRef(checkoutModalError)
  useEffect(() => {
    loadingErrorRef.current = checkoutModalError
  }, [checkoutModalError])

  // Set timeout for maximum loading duration
  // biome-ignore lint/correctness/useExhaustiveDependencies: 1-time effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoadingRef.current && !loadingErrorRef.current) {
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
        showCheckoutErrorModal({
          error: CheckoutModalError.LOADING_TIMEOUT,
        })
      }
    }, MAX_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  // Set loading complete when all conditions are met
  useEffect(() => {
    if (!isLoading || !!checkoutModalError) {
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
    checkoutModalError,
  ])
}

const ORDER_FRAGMENT = graphql`
  fragment useLoadCheckout_order on Order {
    internalID
    lineItems {
      artwork {
        isAcquireable
      }
      artworkVersion {
        internalID
      }
    }
  }
`

const validateOrder = (order: useLoadCheckout_order$data) => {
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
