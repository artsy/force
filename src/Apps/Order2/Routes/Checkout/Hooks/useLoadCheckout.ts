import createLogger from "Utils/logger"
import type { useLoadCheckout_order$key } from "__generated__/useLoadCheckout_order.graphql"
import { every } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useFragment } from "react-relay"
import { graphql } from "react-relay"

const logger = createLogger("useLoadCheckout")

const MINIMUM_LOADING_MS = 1000

type CheckoutLoadingError = "missing_line_item_data"

export const useLoadCheckout = (order?: useLoadCheckout_order$key | null) => {
  const orderData = useFragment(FRAGMENT, order)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingError, setLoadingError] = useState<CheckoutLoadingError | null>(
    null,
  )
  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [expressCheckoutLoaded, setExpressCheckoutLoaded] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)

  const checks = [minimumLoadingPassed, orderValidated, expressCheckoutLoaded]

  const handleExpressCheckoutLoaded = useCallback(() => {
    if (expressCheckoutLoaded) {
      return
    }
    setExpressCheckoutLoaded(true)
  }, [expressCheckoutLoaded])

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
  }, [orderData, orderData?.lineItems, orderValidated])

  // Validate order on load and minimum loading time for the checkout route
  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (orderData) {
      validateOrder()

      const timeout = setTimeout(() => {
        setMinimumLoadingPassed(true)
      }, MINIMUM_LOADING_MS)

      // TODO: Pass to express checkout so it can register when it has loaded
      // for now we simulate it taking a little longer than the minimum
      const expressCheckoutTimeout = setTimeout(() => {
        handleExpressCheckoutLoaded()
      }, MINIMUM_LOADING_MS * 2)

      return () => {
        clearTimeout(timeout)
        clearTimeout(expressCheckoutTimeout)
      }
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (checks.every(Boolean)) {
      setIsLoading(false)
    }
  }, [isLoading, minimumLoadingPassed, orderValidated, expressCheckoutLoaded])

  return {
    isLoading,
    handleExpressCheckoutLoaded,
    loadingError,
    setExpressCheckoutLoaded,
  }
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
