import { Order2CheckoutContextProvider } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { Order2CheckoutApp } from "Apps/Order2/Routes/Checkout/Order2CheckoutApp"
import {
  handleBackNavigation,
  preventHardReload,
} from "Apps/Order2/Utils/navigationGuards"
import { ErrorPage } from "Components/ErrorPage"
import { Analytics } from "System/Contexts/AnalyticsContext"
import type { Order2CheckoutRoute_viewer$key } from "__generated__/Order2CheckoutRoute_viewer.graphql"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutRouteProps {
  viewer: Order2CheckoutRoute_viewer$key
}

export const Order2CheckoutRoute: React.FC<Order2CheckoutRouteProps> = ({
  viewer,
}) => {
  const data = useFragment(FRAGMENT, viewer)
  const order = data.me?.order

  if (!order) {
    return <ErrorPage code={404} message="Order not found" />
  }

  useEffect(() => {
    window.addEventListener("beforeunload", preventHardReload)
    window.history.pushState(null, "", window.location.pathname)
    window.addEventListener("popstate", handleBackNavigation)

    return () => {
      window.removeEventListener("beforeunload", preventHardReload)
      window.removeEventListener("popstate", handleBackNavigation)
    }
  }, [])

  return (
    <Analytics contextPageOwnerId={order.internalID}>
      <Order2CheckoutContextProvider order={order}>
        <Order2CheckoutApp viewer={data} />
      </Order2CheckoutContextProvider>
    </Analytics>
  )
}

const FRAGMENT = graphql`
  fragment Order2CheckoutRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "ID!" }) {
    ...Order2CheckoutApp_viewer @arguments(orderID: $orderID)
    me {
      order(id: $orderID) {
        internalID
        ...Order2CheckoutContext_order
      }
      addressConnection(first: 10) {
        edges {
          node {
            internalID
          }
        }
      }
    }
  }
`
