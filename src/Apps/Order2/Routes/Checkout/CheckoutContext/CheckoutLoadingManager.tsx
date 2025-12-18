import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { useStripePaymentBySetupIntentId } from "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId"
import createLogger from "Utils/logger"
import type { Order2CheckoutContext_order$data } from "__generated__/Order2CheckoutContext_order.graphql"
import { every } from "lodash"
import type React from "react"
import { useEffect, useRef, useState } from "react"

const logger = createLogger("CheckoutLoadingManager.tsx")

export const MIN_LOADING_MS = 1000
export const MAX_LOADING_MS = 6000

interface CheckoutLoadingManagerProps {
  orderData: Order2CheckoutContext_order$data
  children: React.ReactNode
}

export const CheckoutLoadingManager: React.FC<CheckoutLoadingManagerProps> = ({
  orderData,
  children,
}) => {
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

  // Scroll lock during loading (EMI-2880)
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
      setCriticalCheckoutError(error.message)
    }
  }, [orderData, orderValidated, setCriticalCheckoutError])

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoadingRef.current) {
        const error = new Error(
          `Checkout loading state exceeded ${MAX_LOADING_MS}ms timeout: ${Object.entries(
            {
              minimumLoadingPassed,
              orderValidated,
              isExpressCheckoutLoaded,
              isStripeRedirectHandled,
            },
          )
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}`,
        )
        logger.error(error)

        setCriticalCheckoutError("loading_timeout")
      }
    }, MAX_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

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

  return <>{children}</>
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
