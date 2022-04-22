import { Box } from "@artsy/palette"
import { OrderApp_order } from "v2/__generated__/OrderApp_order.graphql"
import { StickyFooterWithInquiry } from "v2/Apps/Order/Components/StickyFooter"
import { SystemContextConsumer, withSystemContext } from "v2/System"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"
import { ErrorPage } from "v2/Components/ErrorPage"
import { MinimalNavBar } from "v2/Components/NavBar/MinimalNavBar"
import { RouterState, withRouter } from "found"
import { Component } from "react"
import { Meta, Title } from "react-head"
import { graphql } from "react-relay"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { ConnectedModalDialog } from "./Dialogs"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { AppContainer } from "../Components/AppContainer"
import { isExceededZendeskThreshold } from "v2/Utils/isExceededZendeskThreshold"
import { getENV } from "v2/Utils/getENV"

export interface OrderAppProps extends RouterState {
  params: {
    orderID: string
  }
  order: OrderApp_order
}

class OrderApp extends Component<OrderAppProps, {}> {
  state = { stripe: null }
  removeNavigationListener: () => void

  componentDidMount() {
    if (!this.removeNavigationListener) {
      this.removeNavigationListener = this.props.router.addNavigationListener(
        this.onTransition
      )
    }

    window.addEventListener("beforeunload", this.preventHardReload)

    // zEmbed represents the Zendesk object
    if (window.zEmbed) {
      window.zEmbed.show()
    }
  }

  componentWillUnmount() {
    if (this.removeNavigationListener) {
      this.removeNavigationListener()
    }

    window.removeEventListener("beforeunload", this.preventHardReload)

    // zEmbed represents the Zendesk object
    if (window.zEmbed) {
      window.zEmbed.hide()
    }
  }

  preventHardReload = event => {
    // Don't block navigation for status page, as we've completed the flow
    if (window.location.pathname.includes("/status")) {
      return false
    }

    event.preventDefault()
    event.returnValue = true
  }

  onTransition = newLocation => {
    const isToTheSameApp = newLocation?.pathname?.includes("/orders/")
    const isRedirect = newLocation?.action === "PUSH"

    if (isToTheSameApp || isRedirect) {
      return true
    }

    // leaving the order page, closing, or refreshing
    const route = findCurrentRoute(this.props.match)

    if (route?.shouldWarnBeforeLeaving) {
      return "Are you sure you want to leave? Your changes will not be saved."
    }

    return true
  }

  renderZendeskScript() {
    const { itemsTotalCents, currencyCode } = this.props.order

    const price = itemsTotalCents! / 100

    if (!price || !isExceededZendeskThreshold(price, currencyCode)) return

    if (typeof window !== "undefined" && window.zEmbed) return

    return <ZendeskWrapper zdKey={getENV("ZENDESK_KEY")} />
  }

  render() {
    const { children, order } = this.props
    let artworkId
    let artworkHref

    if (!order) {
      return <ErrorPage code={404} />
    } else {
      artworkId = get(
        this.props,
        () => order.lineItems?.edges?.[0]?.node?.artwork?.slug
      )
      artworkHref = get(
        this.props,
        () => order.lineItems?.edges?.[0]?.node?.artwork?.href
      )
    }

    const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

    const isModal = !!this.props.match?.location.query.isModal

    return (
      <SystemContextConsumer>
        {({ isEigen }) => {
          return (
            <Box>
              <MinimalNavBar to={artworkHref} isBlank={isModal}>
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
                {!isEigen && !isModal && this.renderZendeskScript()}
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
                    artworkID={artworkId}
                  />
                )}
                <ConnectedModalDialog />
              </MinimalNavBar>
            </Box>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

const OrderAppWithRouter = withRouter(withSystemContext(OrderApp))

export { OrderAppWithRouter as OrderApp }

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 75px;
`

graphql`
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
`
