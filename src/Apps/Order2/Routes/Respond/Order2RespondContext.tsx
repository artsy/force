import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import type { Order2RespondContext_order$key } from "__generated__/Order2RespondContext_order.graphql"
import { createContext, useContext, useMemo } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2RespondContextValue {
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  artworkPath: string
}

const Order2RespondContext = createContext<Order2RespondContextValue | null>(
  null,
)

interface Order2RespondContextProviderProps {
  order: Order2RespondContext_order$key
  children: React.ReactNode
}

export const Order2RespondContextProvider: React.FC<
  Order2RespondContextProviderProps
> = ({ order, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const checkoutTracking = useCheckoutTracking(orderData)

  // Calculate artworkPath from orderData
  const artworkPath = useMemo(() => {
    const artworkSlug = orderData.lineItems?.[0]?.artwork?.slug
    return artworkSlug ? `/artwork/${artworkSlug}` : "/"
  }, [orderData])

  const value = useMemo(
    () => ({
      checkoutTracking,
      artworkPath,
    }),
    [checkoutTracking, artworkPath],
  )

  return (
    <Order2RespondContext.Provider value={value}>
      {children}
    </Order2RespondContext.Provider>
  )
}

export const useRespondContext = () => {
  const context = useContext(Order2RespondContext)
  if (!context) {
    throw new Error(
      "useRespondContext must be used within Order2RespondContextProvider",
    )
  }
  return context
}

const ORDER_FRAGMENT = graphql`
  fragment Order2RespondContext_order on Order {
    internalID
    source
    mode
    lineItems {
      artwork {
        slug
      }
    }
  }
`
