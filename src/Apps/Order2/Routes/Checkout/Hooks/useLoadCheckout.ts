import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutModalError } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { setNavigationGuardsEnabled } from "Apps/Order2/Order2App"
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
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const {
    isLoading,
    setLoadingComplete,
    setExpressCheckoutLoaded,
    expressCheckoutPaymentMethods,
    expressCheckoutState,
    steps,
  } = useCheckoutContext()

  const { checkoutModalError, showCheckoutErrorModal } = useCheckoutModal()

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

  // Scroll lock during loading.
  // Pad the body by the scrollbar width while locked so the layout doesn't shift
  // when the scrollbar appears on unlock (a scrollbar-width-wide shift otherwise occurs).
  useEffect(() => {
    if (isLoading) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.setProperty("overflow", "hidden")
      document.body.style.setProperty("padding-right", `${scrollbarWidth}px`)
    } else {
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("padding-right")
    }

    return () => {
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("padding-right")
    }
  }, [isLoading])

  // If a critical error occurs, disable navigation guards so the user can leave
  useEffect(() => {
    if (checkoutModalError) {
      setNavigationGuardsEnabled(false)
    }
  }, [checkoutModalError])

  // Disable navigation guards while express checkout (Apple Pay / Google Pay)
  // modal is open so the browser back button doesn't show a confirmation dialog
  useEffect(() => {
    if (expressCheckoutState !== null) {
      setNavigationGuardsEnabled(false)
    } else {
      setNavigationGuardsEnabled(true)
    }
  }, [expressCheckoutState])

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

  // Mirror the loading-gate flags into a ref so the one-shot timeout below
  // can read their *current* values when it fires. Without this, the timeout
  // closure captures the values at mount (all false), making the Sentry log
  // useless for diagnosing which flag was actually stuck.
  const flagsRef = useRef({
    minimumLoadingPassed,
    orderValidated,
    isExpressCheckoutLoaded,
  })
  useEffect(() => {
    flagsRef.current = {
      minimumLoadingPassed,
      orderValidated,
      isExpressCheckoutLoaded,
    }
  }, [minimumLoadingPassed, orderValidated, isExpressCheckoutLoaded])

  // After MAX_LOADING_MS without loading completing, log the stuck flags to
  // Sentry, then either degrade gracefully (Express Checkout-only failure)
  // or surface a blocking modal (anything else is stuck).
  //
  // biome-ignore lint/correctness/useExhaustiveDependencies: 1-time effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoadingRef.current || loadingErrorRef.current) return

      const flags = flagsRef.current
      const loadingState = Object.entries(flags)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")

      logger.error(
        new Error(
          `Checkout loading state exceeded ${MAX_LOADING_MS}ms timeout: ${loadingState}`,
        ),
      )

      const onlyExpressCheckoutStuck =
        !flags.isExpressCheckoutLoaded &&
        flags.minimumLoadingPassed &&
        flags.orderValidated

      if (onlyExpressCheckoutStuck) {
        setExpressCheckoutLoaded([])
      } else {
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
