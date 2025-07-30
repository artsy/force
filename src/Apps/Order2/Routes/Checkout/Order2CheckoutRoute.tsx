import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Order2CheckoutContextProvider } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { Order2CheckoutApp } from "Apps/Order2/Routes/Checkout/Order2CheckoutApp"
import {
  handleBackNavigation,
  preventHardReload,
} from "Apps/Order2/Utils/navigationGuards"
import { ErrorPage } from "Components/ErrorPage"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { getENV } from "Utils/getENV"
import type { Order2CheckoutRoute_viewer$key } from "__generated__/Order2CheckoutRoute_viewer.graphql"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutRouteProps {
  viewer: Order2CheckoutRoute_viewer$key
}

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

export const Order2CheckoutRoute: React.FC<Order2CheckoutRouteProps> = ({
  viewer,
}) => {
  const data = useFragment(FRAGMENT, viewer)
  const me = data.me
  const order = me?.order

  if (!(order && me)) {
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
      <Elements stripe={stripePromise}>
        <Order2CheckoutContextProvider order={order}>
          <Order2CheckoutApp order={order} me={me} />
        </Order2CheckoutContextProvider>
      </Elements>
    </Analytics>
  )
}

const FRAGMENT = graphql`
  fragment Order2CheckoutRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "ID!" }) {
    me {
      ...Order2CheckoutApp_me
      order(id: $orderID) {
        internalID
        ...Order2CheckoutContext_order
        ...Order2CheckoutApp_order
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
