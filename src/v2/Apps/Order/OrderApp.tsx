import { Box } from "@artsy/palette"
import { OrderApp_order } from "v2/__generated__/OrderApp_order.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { StickyFooter } from "v2/Apps/Order/Components/StickyFooter"
import { SystemContextConsumer, withSystemContext } from "v2/Artsy"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { ErrorPage } from "v2/Components/ErrorPage"
import { MinimalNavBar } from "v2/Components/NavBar/MinimalNavBar"
import { RouterState, withRouter } from "found"
import React from "react"
import { Meta, Title } from "react-head"
import { graphql } from "react-relay"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { ConnectedModalDialog } from "./Dialogs"
import { Mediator } from "lib/mediator"
import { data as sd } from "sharify"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"

export interface OrderAppProps extends RouterState {
  params: {
    orderID: string
  }
  order: OrderApp_order
}

class OrderApp extends React.Component<OrderAppProps, {}> {
  mediator: Mediator | null = null
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
    if (newLocation === null || !newLocation.pathname.includes("/orders/")) {
      // leaving the order page, closing, or refreshing
      const route = findCurrentRoute(this.props.match)
      if (route.shouldWarnBeforeLeaving) {
        return "Are you sure you want to leave? Your changes will not be saved."
      }
    }
    return true
  }

  renderZendeskScript() {
    const artwork = get(
      this.props,
      props => props.order.lineItems.edges[0].node.artwork
    )
    const { isInquireable, listPrice, priceCurrency } = artwork

    const BNMO_CURRENCY_THRESHOLDS = {
      USD: 10000,
      EUR: 8000,
      HKD: 77000,
      GBP: 7000,
    }

    // This accounts for exact price and price ranges
    const artworkPrice = listPrice?.major
      ? listPrice.major
      : listPrice.minPrice?.major

    if (
      (!artworkPrice && !isInquireable) ||
      artworkPrice < BNMO_CURRENCY_THRESHOLDS[priceCurrency]
    )
      return

    if (typeof window !== "undefined" && window.zEmbed) return

    return <ZendeskWrapper />
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
        props => order.lineItems.edges[0].node.artwork.slug
      )
      artworkHref = get(
        this.props,
        props => order.lineItems.edges[0].node.artwork.href
      )
    }

    const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY)
    return (
      <SystemContextConsumer>
        {({ isEigen, mediator }) => {
          this.mediator = mediator
          return (
            <MinimalNavBar to={artworkHref}>
              <AppContainer>
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
                {!isEigen && this.renderZendeskScript()}
                <SafeAreaContainer>
                  <Elements stripe={stripePromise}>
                    <>{children}</>
                  </Elements>
                </SafeAreaContainer>
                <StickyFooter orderType={order.mode} artworkId={artworkId} />
                <ConnectedModalDialog />
              </AppContainer>
            </MinimalNavBar>
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
    lineItems {
      edges {
        node {
          artwork {
            href
            slug
            is_acquireable: isAcquireable
            is_offerable: isOfferable
            isInquireable
            priceCurrency
            listPrice {
              ... on Money {
                major
              }
              ... on PriceRange {
                minPrice {
                  major
                }
              }
            }
          }
        }
      }
    }
  }
`
