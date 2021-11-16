import { Component } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { Router, Match } from "found"
import {
  Button,
  Flex,
  Join,
  Message,
  Text,
  Spacer,
  media,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import createLogger from "v2/Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"
import { SystemContextConsumer } from "v2/System/SystemContext"
import { Status_order } from "v2/__generated__/Status_order.graphql"

const logger = createLogger("Order/Routes/Status/index.tsx")

interface StatusPageConfig {
  title: React.ReactNode
  description: React.ReactNode
  // default showTransactionSummary is true
  showTransactionSummary?: boolean
}

interface ShipmentData {
  shipperName: string | null
  trackingId: string | null
  trackingUrl: string | null
  estimatedDelivery: string | null
}

export interface StatusProps {
  order: Status_order
  router: Router
  match: Match
}

export class StatusRoute extends Component<StatusProps> {
  getStatusCopy(): StatusPageConfig {
    const {
      displayState,
      state,
      requestedFulfillment,
      mode,
      stateReason,
      stateExpiresAt,
    } = this.props.order
    const isOfferFlow = mode === "OFFER"
    const isPickup = requestedFulfillment?.__typename === "CommercePickup"
    const isArtaShipped: boolean =
      requestedFulfillment?.__typename === "CommerceShipArta"

    switch (displayState) {
      case "SUBMITTED":
        return isOfferFlow
          ? {
              title: "Your offer has been submitted",
              description: (
                <>
                  The seller will respond to your offer by {stateExpiresAt}.
                  Keep in mind making an offer doesn’t guarantee you the work.
                </>
              ),
            }
          : {
              title: "Your order has been submitted",
              description: (
                <>
                  Thank you for your purchase. You will receive a confirmation
                  email by {stateExpiresAt}.{this.covidNote()}
                </>
              ),
            }
      case "APPROVED":
        return {
          title: this.approvedTitle(isOfferFlow),
          description: isPickup ? (
            <>
              Thank you for your purchase. A specialist will contact you within
              2 business days to coordinate pickup.
              {this.covidNote()}
            </>
          ) : (
            <>
              Thank you for your purchase. You will be notified when the work
              has shipped, typically within 5–7 business days.
              {this.covidNote()}
            </>
          ),
        }
      case "PROCESSING":
        return {
          title: this.approvedTitle(isOfferFlow),
          description: (
            <>
              Thank you for your purchase. {this.deliverText()}More delivery
              information will be available once your order ships.
              {this.covidNote()}
            </>
          ),
        }
      case "IN_TRANSIT":
        return {
          title: "Your order has shipped",
          description: this.shipmentDescription(isArtaShipped, false),
        }
      case "FULFILLED": {
        return isPickup
          ? {
              title: "Your order has been picked up",
              description: null,
            }
          : {
              title: isArtaShipped
                ? "Your order is complete"
                : "Your order has shipped",
              description: this.shipmentDescription(isArtaShipped, true),
            }
      }
      case "CANCELED":
      case "REFUNDED":
        if (!isOfferFlow || state === "REFUNDED" || stateReason === null) {
          // stateReason === null for offer orders only if the order was rejected
          // after the offer was accepted.
          return {
            title: "Your order was canceled and refunded",
            description: (
              <>
                Please allow 5–7 business days for the refund to appear on your
                bank statement. Contact{" "}
                <a href="mailto:orders@artsy.net">orders@artsy.net</a> with any
                questions.
              </>
            ),
          }
        }
        // otherwise this was an offer order that was rejected before being
        // accepted
        return this.canceledOfferOrderCopy()
      default:
        // This should not happen. Check the order displayState here:
        // https://github.com/artsy/exchange/blob/master/app/models/order.rb
        // (Aside from PENDING and ABANDONED)
        logger.error(`Unhandled order state: ${displayState} in ${state} state`)
        return {
          title: "Your order",
          description: null,
        }
    }
  }

  covidNote(): React.ReactNode {
    return (
      <>
        <Spacer mb={1} />
        Disruptions caused by COVID-19 may cause delays — we appreciate your
        understanding.
      </>
    )
  }

  approvedTitle(isOferFlow): string {
    return isOferFlow ? "Offer accepted" : "Your order is confirmed"
  }

  deliverText(): React.ReactNode {
    const selectedShipping = this.props.order?.lineItems?.edges?.[0]?.node
      ?.selectedShippingQuote?.displayName

    let daysToDeliver: string | null = null
    switch (selectedShipping) {
      case "Rush":
        daysToDeliver = "1 business day "
        break
      case "Express":
        daysToDeliver = "2 business days"
        break
      case "Standard":
        daysToDeliver = "3-5 business days"
    }
    return daysToDeliver
      ? `Your order will be delivered in ${daysToDeliver} once shipped, plus up to 7 days processing time. `
      : null
  }

  trackingInfo(trackingId, trackingUrl): React.ReactNode | null {
    const node = trackingUrl ? (
      <RouterLink to={trackingUrl} target="_blank">
        {trackingId ? trackingId : "info"}
      </RouterLink>
    ) : (
      trackingId
    )
    return (
      <>
        Tracking: {node}
        <Spacer mb={1} />
      </>
    )
  }

  shipmentDescription(
    isArtaShipped: boolean,
    isDelivered: boolean
  ): React.ReactNode {
    const shipmentData: ShipmentData | null = this.getShipmentInfo()

    if (!shipmentData) {
      return null
    }

    const hasTrackingInfo =
      shipmentData.trackingId?.length || shipmentData.trackingUrl?.length

    return (
      <>
        {isArtaShipped && isDelivered
          ? "Your order has been delivered."
          : "Your work is on its way."}
        {isArtaShipped &&
          !hasTrackingInfo &&
          !isDelivered &&
          " " +
            "Our delivery provider will call you to provide a delivery window when it arrives in your area."}
        <Spacer mb={2} />
        {shipmentData.shipperName && (
          <>
            Shipper: {shipmentData.shipperName}
            <Spacer mb={1} />
          </>
        )}
        {hasTrackingInfo &&
          this.trackingInfo(shipmentData.trackingId, shipmentData.trackingUrl)}
        {shipmentData.estimatedDelivery && (
          <>
            {isArtaShipped && isDelivered
              ? "Delivery date:"
              : "Estimated delivery:"}{" "}
            {shipmentData.estimatedDelivery}
          </>
        )}
      </>
    )
  }

  getShipmentInfo(): ShipmentData | null {
    const fulfillment = this.props.order?.lineItems?.edges?.[0]?.node
      ?.fulfillments?.edges?.[0]?.node

    const shipment = this.props.order?.lineItems?.edges?.[0]?.node?.shipment

    if (!fulfillment && !shipment) return null

    return {
      shipperName: shipment?.carrierName || fulfillment?.courier || null,
      trackingId: shipment?.trackingNumber || fulfillment?.trackingId || null,
      trackingUrl: shipment?.trackingUrl || null,
      estimatedDelivery:
        shipment?.estimatedDeliveryWindow ||
        fulfillment?.estimatedDelivery ||
        null,
    }
  }

  canceledOfferOrderCopy(): StatusPageConfig {
    const { stateReason } = this.props.order
    switch (stateReason) {
      case "buyer_rejected":
        return {
          title: "Offer declined",
          description: (
            <>
              Thank you for your response. The seller will be informed of your
              decision to end the negotiation process.
              <Spacer mb={2} />
              We’d love to get your feedback. Contact{" "}
              <a href="mailto:orders@artsy.net">orders@artsy.net</a> with any
              comments you have.
            </>
          ),
          showTransactionSummary: false,
        }
      case "seller_rejected_offer_too_low":
      case "seller_rejected_shipping_unavailable":
      case "seller_rejected":
      case "seller_rejected_artwork_unavailable":
      case "seller_rejected_other":
        return {
          title: "Offer declined",
          description: (
            <>
              Sorry, the seller declined your offer and has ended the
              negotiation process.
            </>
          ),
          showTransactionSummary: false,
        }
      case "buyer_lapsed":
        return {
          title: "Offer expired",
          description: (
            <>The seller’s offer expired because you didn’t respond in time.</>
          ),
          showTransactionSummary: false,
        }
      case "seller_lapsed":
        return {
          title: "Offer expired",
          description: (
            <>
              Your offer expired because the seller didn’t respond to your offer
              in time.
            </>
          ),
          showTransactionSummary: false,
        }
      default:
        // This should not happen. Check the cancel reasons are all accounted for:
        // https://github.com/artsy/exchange/blob/master/app/models/order.rb
        logger.error(`Unhandled cancellation reason: ${stateReason}`)
        return {
          title: "Offer declined",
          description: null,
          showTransactionSummary: false,
        }
    }
  }

  shouldButtonDisplay(): React.ReactNode | null {
    const {
      match,
      order: { stateReason },
    } = this.props
    const isModal = !!match?.location.query.isModal
    const declinedStatuses = [
      "buyer_rejected",
      "seller_rejected_offer_too_low",
      "seller_rejected_shipping_unavailable",
      "seller_rejected",
      "seller_rejected_artwork_unavailable",
      "seller_rejected_other",
    ]
    const isDeclined = declinedStatuses.includes(stateReason!)

    if (isModal || isDeclined) {
      return null
    }

    return (
      // @ts-ignore
      <Button as={RouterLink} to="/" variant="primaryBlack" width="100%">
        Back to Artsy
      </Button>
    )
  }

  render() {
    const { order } = this.props
    const flowName = order.mode === "OFFER" ? "Offer" : "Order"
    const {
      title,
      description,
      showTransactionSummary = true,
    } = this.getStatusCopy()
    const showOfferNote = order.mode === "OFFER" && order.state === "SUBMITTED"

    return (
      <SystemContextConsumer>
        {({ isEigen }) => {
          return (
            <>
              <Text variant="lg" fontWeight="regular" color="black100">
                {title}
              </Text>
              <Text
                variant="xs"
                fontWeight="regular"
                color="black60"
                mb={[2, 4]}
              >
                {flowName} <span data-test="OrderCode">#{order.code}</span>
              </Text>
              <TwoColumnLayout
                Content={
                  <>
                    <Title>{flowName} status | Artsy</Title>
                    <Join separator={<Spacer mb={[2, 4]} />}>
                      {description && (
                        <Message p={[2, 4]}>{description}</Message>
                      )}
                      {showTransactionSummary ? (
                        <Flex flexDirection="column">
                          <ArtworkSummaryItem order={order} />
                          <StyledTransactionDetailsSummaryItem
                            order={order}
                            useLastSubmittedOffer
                            showOfferNote={showOfferNote}
                          />
                        </Flex>
                      ) : (
                        isEigen && this.shouldButtonDisplay()
                      )}
                    </Join>
                  </>
                }
                Sidebar={
                  showTransactionSummary && (
                    <Flex flexDirection="column">
                      <Flex flexDirection="column">
                        <StyledShippingSummaryItem order={order} />
                        <CreditCardSummaryItem order={order} />
                      </Flex>
                    </Flex>
                  )
                }
              />
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

const StyledShippingSummaryItem = styled(ShippingSummaryItem)`
  ${media.xs`
    &&& {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `};
`
const StyledTransactionDetailsSummaryItem = styled(
  TransactionDetailsSummaryItem
)`
  ${media.xs`
    &&& {
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  `};
`

export const StatusFragmentContainer = createFragmentContainer(StatusRoute, {
  order: graphql`
    fragment Status_order on CommerceOrder {
      __typename
      internalID
      code
      displayState
      state
      mode
      stateReason
      stateExpiresAt(format: "MMM D")
      requestedFulfillment {
        ... on CommerceShip {
          __typename
        }
        ... on CommercePickup {
          __typename
        }
        ... on CommerceShipArta {
          __typename
        }
      }
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
      lineItems {
        edges {
          node {
            shipment {
              trackingNumber
              trackingUrl
              carrierName
              estimatedDeliveryWindow
            }
            selectedShippingQuote {
              displayName
            }
            fulfillments {
              edges {
                node {
                  courier
                  trackingId
                  estimatedDelivery(format: "MMM Do, YYYY")
                }
              }
            }
          }
        }
      }
      ... on CommerceOfferOrder {
        myLastOffer {
          internalID
          amount(precision: 2)
          amountCents
          shippingTotal(precision: 2)
          shippingTotalCents
          taxTotal(precision: 2)
          taxTotalCents
        }
      }
    }
  `,
})
