import { FC, useEffect, useRef } from "react"
import { Box } from "@artsy/palette"
import { OrderApp_order } from "__generated__/OrderApp_order.graphql"
import { StickyFooterWithInquiry } from "Apps/Order/Components/StickyFooter"
import { SystemContextConsumer } from "System"
import { findCurrentRoute } from "System/Router/Utils/findCurrentRoute"
import { ErrorPage } from "Components/ErrorPage"
import { MinimalNavBar } from "Components/NavBar/MinimalNavBar"
import { RouterState } from "found"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import styled from "styled-components"
import { get } from "Utils/get"
import { ConnectedModalDialog } from "./Dialogs"
import { ZendeskWrapper } from "Components/ZendeskWrapper"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { AppContainer } from "../Components/AppContainer"
import { isExceededZendeskThreshold } from "Utils/isExceededZendeskThreshold"
import { getENV } from "Utils/getENV"

export interface OrderAppProps extends RouterState {
  params: {
    orderID: string
  }
  order: OrderApp_order
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
  const removeNavigationListenerRef = useRef<null | (() => void)>(null)

  useEffect(() => {
    if (!removeNavigationListenerRef.current) {
      removeNavigationListenerRef.current = router.addNavigationListener(
        handleTransition()
      )
    }

    window.addEventListener("beforeunload", preventHardReload)

    return () => {
      if (removeNavigationListenerRef) {
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

  const renderZendeskScript = () => {
    const { itemsTotalCents, currencyCode } = order
    const price = itemsTotalCents! / 100

    if (!price || !isExceededZendeskThreshold(price, currencyCode)) {
      return null
    }

    return <ZendeskWrapper />
  }

  const artworkId = get(
    props,
    () => order.lineItems?.edges?.[0]?.node?.artwork?.slug
  )

  const artworkHref = get(
    props,
    () => order.lineItems?.edges?.[0]?.node?.artwork?.href
  )

  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))
  const isModal = !!props.match?.location.query.isModal

  return (
    <SystemContextConsumer>
      {({ isEigen }) => (
        <Box>
          <MinimalNavBar to={artworkHref!} isBlank={isModal}>
            <Title>Checkout | Artsy</Title>
            {isEigen ? (
              <Meta
                name="viewport"
                content="width=device-width, user-scalable=no"
              />
            ) : (
              <Meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
              />
            )}
            {!isEigen && !isModal && renderZendeskScript()}
            <SafeAreaContainer>
              <Elements stripe={stripePromise}>
                <AppContainer>
                  <HorizontalPadding>{children}</HorizontalPadding>
                </AppContainer>
              </Elements>
            </SafeAreaContainer>
            {!isModal && (
              <StickyFooterWithInquiry
                orderType={order.mode}
                artworkID={artworkId!}
              />
            )}
            <ConnectedModalDialog />
          </MinimalNavBar>
        </Box>
      )}
    </SystemContextConsumer>
  )
}

export const OrderAppFragmentContainer = createFragmentContainer(OrderApp, {
  order: graphql`
    fragment OrderApp_order on CommerceOrder {
      mode
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
