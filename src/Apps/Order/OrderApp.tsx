import { FC, useEffect, useRef } from "react"
import { Box } from "@artsy/palette"
import { OrderApp_order$data } from "__generated__/OrderApp_order.graphql"
import { StickyFooterWithInquiry } from "Apps/Order/Components/StickyFooter"
import { ErrorPage } from "Components/ErrorPage"
import { RouterState } from "found"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import styled from "styled-components"
import { ConnectedModalDialog } from "./Dialogs"
import { AppContainer } from "Apps/Components/AppContainer"
import { exceedsChatSupportThreshold } from "Utils/exceedsChatSupportThreshold"
import { getENV } from "Utils/getENV"
import { extractNodes } from "Utils/extractNodes"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { OrderPaymentContextProvider } from "./Routes/Payment/PaymentContext/OrderPaymentContext"
import { SalesforceWrapper } from "Components/SalesforceWrapper"
import { Media } from "Utils/Responsive"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"

export interface OrderAppProps extends RouterState {
  params: {
    orderID: string
  }
  order: OrderApp_order$data
}

export const preventHardReload = event => {
  // Don't block navigation for status page, as we've completed the flow
  if (window.location.pathname.includes("/status")) {
    return false
  }

  event.preventDefault()
  event.returnValue = true
}

const OrderApp: FC<OrderAppProps> = props => {
  const { order, children, match, router } = props
  const { isEigen } = useSystemContext()

  const removeNavigationListenerRef = useRef<null | (() => void)>(null)

  useEffect(() => {
    if (!removeNavigationListenerRef.current) {
      removeNavigationListenerRef.current = router.addNavigationListener(
        handleTransition()
      )
    }

    window.addEventListener("beforeunload", preventHardReload)

    return () => {
      if (removeNavigationListenerRef.current) {
        removeNavigationListenerRef.current()
        removeNavigationListenerRef.current = null
      }
      window.removeEventListener("beforeunload", preventHardReload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTransition = () => newLocation => {
    const isToTheSameApp = newLocation?.pathname?.includes("/orders/")
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

    if (!getENV("SALESFORCE_CHAT_ENABLED")) {
      return null
    }

    return (
      <Media greaterThan="xs">
        <SalesforceWrapper />
      </Media>
    )
  }

  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))
  const isModal = !!props.match?.location.query.isModal
  const artwork = extractNodes(order.lineItems)[0].artwork

  return (
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

      {!isModal && (
        <StickyFooterWithInquiry
          orderType={order.mode}
          orderSource={order.source}
          artworkID={artwork?.slug as string}
        />
      )}

      <ConnectedModalDialog />
    </Box>
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
