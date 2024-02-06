import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useEffect } from "react"

/**
 * Automatically selects first shipping quote when they change
 */
export const useSelectFirstShippingQuote = () => {
  const shippingContext = useShippingContext()

  const defaultShippingQuoteID =
    shippingContext.orderData.shippingQuotes?.[0]?.id

  const bestArtsyShippingQuote = shippingContext.orderData
    .savedFulfillmentDetails?.isArtsyShipping
    ? shippingContext.orderData.shippingQuotes?.find(quote => quote.isSelected)
        ?.id || defaultShippingQuoteID
    : null

  useEffect(() => {
    if (
      bestArtsyShippingQuote &&
      bestArtsyShippingQuote !==
        shippingContext.orderData.selectedShippingQuoteID
    ) {
      shippingContext.actions.setSelectedShippingQuote(bestArtsyShippingQuote)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shippingContext.orderData.selectedShippingQuoteID,
    defaultShippingQuoteID,
    bestArtsyShippingQuote,
  ])
}
