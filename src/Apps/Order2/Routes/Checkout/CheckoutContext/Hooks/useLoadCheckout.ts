import type { CheckoutLoadingError } from "Apps/Order2/Routes/Checkout/CheckoutContext/utils"
import createLogger from "Utils/logger"
import type { useLoadCheckout_order$key } from "__generated__/useLoadCheckout_order.graphql"
import { every } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useFragment } from "react-relay"
import { graphql } from "react-relay"

const logger = createLogger("useLoadCheckout.ts")

const MINIMUM_LOADING_MS = 1000

interface useLoadCheckoutArguments {
  order: useLoadCheckout_order$key | null

  setLoadingError: (error: CheckoutLoadingError | null) => void
  setLoadingComplete: () => void
  isExpressCheckoutLoaded: boolean
  loadingError: CheckoutLoadingError | null
  isLoading: boolean
}

export const useLoadCheckout = ({
  order,
  isExpressCheckoutLoaded,
  isLoading,
  setLoadingComplete,
  setLoadingError,
}: useLoadCheckoutArguments) => {
  const orderData = useFragment(FRAGMENT, order)

  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)

  const checks = [minimumLoadingPassed, orderValidated, isExpressCheckoutLoaded]

  // Validate order and get into good initial checkout state on load
  // - artwork version match
  // - any resetting
  const validateOrder = useCallback(() => {
    if (orderValidated || !orderData) {
      return
    }

    const hasLineItemsWithData =
      orderData.lineItems.length &&
      every(orderData.lineItems, lineItem => {
        return !!lineItem?.artworkVersion?.internalID
      })

    try {
      if (!hasLineItemsWithData) {
        throw new Error("missing_line_item_data")
      }

      setOrderValidated(true)
    } catch (error) {
      logger.error("Error validating order: ", error.message)
      setLoadingError(error.message)
    }
  }, [orderData, orderData?.lineItems, orderValidated, setLoadingError])

  // Validate order on load and minimum loading time for the checkout route
  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (orderData) {
      validateOrder()

      const timeout = setTimeout(() => {
        setMinimumLoadingPassed(true)
      }, MINIMUM_LOADING_MS)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (checks.every(Boolean)) {
      setLoadingComplete()
    }
  }, [isLoading, minimumLoadingPassed, orderValidated, isExpressCheckoutLoaded])
}

const FRAGMENT = graphql`
  fragment useLoadCheckout_order on Order {
    lineItems {
      artworkVersion {
        internalID
      }
    }
  }
`
