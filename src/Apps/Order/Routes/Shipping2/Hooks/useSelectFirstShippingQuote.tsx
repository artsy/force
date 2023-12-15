import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useEffect } from "react"

/**
 * Automatically selects first shipping quote when they change
 */
export const useSelectFirstShippingQuote = () => {
  const shippingContext = useShippingContext()

  const defaultShippingQuoteId =
    shippingContext.orderData.shippingQuotes?.[0]?.id

  const bestArtsyShippingQuote = shippingContext.state.isArtsyShipping
    ? shippingContext.orderData.shippingQuotes?.find(quote => quote.isSelected)
        ?.id || defaultShippingQuoteId
    : null

  useEffect(() => {
    if (
      bestArtsyShippingQuote &&
      bestArtsyShippingQuote !==
        shippingContext.orderData.selectedShippingQuoteId
    ) {
      shippingContext.actions.setSelectedShippingQuote(bestArtsyShippingQuote)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shippingContext.orderData.selectedShippingQuoteId,
    defaultShippingQuoteId,
    bestArtsyShippingQuote,
  ])
}
