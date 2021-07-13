import { Box } from "@artsy/palette"
import { OrderApp_order } from "v2/__generated__/OrderApp_order.graphql"
import { StickyFooter } from "v2/Apps/Order/Components/StickyFooter"
import { SystemContextConsumer, withSystemContext } from "v2/System"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"
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
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { AppContainer } from "../Components/AppContainer"

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

    if (!document.getElementById("legacy-assets-dll")) {
      import(
        /* webpackChunkName: 'legacy-assets-dll' */ "../../Utils/legacyAssetDll"
      ).then(({ legacyAssetDll }) => {
        legacyAssetDll()
      })
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id='legacy-assets-dll' />`
      )
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

    if (this.mediator) {
      this.mediator.off("openOrdersContactArtsyModal")
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
  }

  renderZendeskScript() {
    if (typeof window !== "undefined" && window.zEmbed) return

    return <ZendeskWrapper zdKey={sd.ZENDESK_KEY} />
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
        // @ts-expect-error STRICT_NULL_CHECK
        props => order.lineItems.edges[0].node.artwork.slug
      )
      artworkHref = get(
        this.props,
        // @ts-expect-error STRICT_NULL_CHECK
        props => order.lineItems.edges[0].node.artwork.href
      )
    }

    const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY)

    const isModal = this.props.match?.location.query.isModal ? true : false

    return (
      <SystemContextConsumer>
        {({ isEigen, mediator }) => {
          // @ts-expect-error STRICT_NULL_CHECK
          this.mediator = mediator

          return (
            <Box>
              {/* FIXME: remove once we refactor out legacy backbone code.
                    Add place to attach legacy flash message, used in legacy inquiry flow
                */}
              <div id="main-layout-flash" />
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
                {!isEigen && this.renderZendeskScript()}
                <SafeAreaContainer>
                  <Elements stripe={stripePromise}>
                    <AppContainer>
                      <HorizontalPadding>{children}</HorizontalPadding>
                    </AppContainer>
                  </Elements>
                </SafeAreaContainer>
                {!isModal && (
                  <StickyFooter orderType={order.mode} artworkId={artworkId} />
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
