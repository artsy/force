import { Box } from "@artsy/palette"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { AppContainer } from "Apps/Components/AppContainer"
import { StickyFooterWithInquiry } from "Apps/Order/Components/StickyFooter"
import { ErrorPage } from "Components/ErrorPage"
import { SalesforceWrapper } from "Components/SalesforceWrapper"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"
import { Media } from "Utils/Responsive"
import { exceedsChatSupportThreshold } from "Utils/exceedsChatSupportThreshold"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import type { OrderApp_order$data } from "__generated__/OrderApp_order.graphql"
import type { RouterState } from "found"
import { type FC, useEffect, useRef } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
// eslint-disable-next-line no-restricted-imports
import { Provider } from "unstated"
import { ConnectedModalDialog } from "./Dialogs"
import { OrderPaymentContextProvider } from "./Routes/Payment/PaymentContext/OrderPaymentContext"

export interface OrderAppProps extends RouterState {
  params: {
    orderID: string
  }
  order: OrderApp_order$data
}

export const preventHardReload = event => {
  // Don't block navigation for details page, as we've completed the flow
  if (window.location.pathname.includes("/details")) {
    return false
  }

  event.preventDefault()
  event.returnValue = true
}

const OrderApp: FC<React.PropsWithChildren<OrderAppProps>> = props => {
  const { order, children, match, router } = props
  const { isEigen } = useSystemContext()

  const removeNavigationListenerRef = useRef<null | (() => void)>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
  useEffect(() => {
    if (!removeNavigationListenerRef.current) {
      removeNavigationListenerRef.current =
        router.addNavigationListener(handleTransition())
    }

    window.addEventListener("beforeunload", preventHardReload)

    return () => {
      if (removeNavigationListenerRef.current) {
        removeNavigationListenerRef.current()
        removeNavigationListenerRef.current = null
      }
      window.removeEventListener("beforeunload", preventHardReload)
    }
  }, [])

  const handleTransition = () => newLocation => {
    // Regex to test for both 'orders' and 'orders2' pages
    // as we plan to do a staged release where Order and Order2
    // will exist in parallel in production for some time
    const isToTheSameApp = /\/orders?2?\//.test(newLocation?.pathname ?? "")
    const isRedirect = newLocation?.action === "PUSH"

    if (isToTheSameApp || isRedirect) {
      return true
    }

    // leaving the order page, closing, or refreshing
    const route = findCurrentRoute(match)

    if (route?.shouldWarnBeforeLeaving) {
      return "Are you sure you want to leave? Your changes will not be saved."
    }

    return true
  }

  if (!order) {
    return <ErrorPage code={404} />
  }

  const renderChatSupportScript = () => {
    const { itemsTotalCents, currencyCode } = order
    const price = (itemsTotalCents as number) / 100

    if (!price || !exceedsChatSupportThreshold(price, currencyCode)) {
      return null
    }

    if (!getENV("SALESFORCE_MESSAGE_ENABLED")) {
      return null
    }

    return (
      <Media greaterThan="xs">
        <div data-testid="salesforce-wrapper">
          <SalesforceWrapper />
        </div>
      </Media>
    )
  }

  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))
  const isModal = !!props.match?.location.query.isModal
  const isOrderDetails = !!props.match?.location.pathname.includes("/details")
  const artwork = extractNodes(order.lineItems)[0].artwork

  return (
    <Provider>
      <Box>
        <Title>Checkout | Artsy</Title>
        <Meta
          name="viewport"
          content={
            isEigen
              ? "width=device-width, user-scalable=no"
              : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
          }
        />

        {!isEigen && !isModal && renderChatSupportScript()}

        <SafeAreaContainer>
          <OrderPaymentContextProvider>
            <Elements stripe={stripePromise}>
              <AppContainer>{children}</AppContainer>
            </Elements>
          </OrderPaymentContextProvider>
        </SafeAreaContainer>

        {!isOrderDetails && !isModal && (
          <StickyFooterWithInquiry
            orderType={order.mode}
            orderSource={order.source}
            artworkID={artwork?.slug as string}
          />
        )}

        <ConnectedModalDialog />
      </Box>
    </Provider>
  )
}

export const OrderAppFragmentContainer = createFragmentContainer(OrderApp, {
  order: graphql`
    fragment OrderApp_order on CommerceOrder {
      mode
      source
      currencyCode
      itemsTotalCents
      lineItems {
        edges {
          node {
            artwork {
              href
              slug
              is_acquireable: isAcquireable
              is_offerable: isOfferable
            }
          }
        }
      }
    }
  `,
})

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 200px;
`
