import { Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

interface StatusPageConfig {
  title?: React.ReactNode
  description?: React.ReactNode
  alertMessageTitle?: string | null
  alertMessage?: React.ReactNode
  content?: React.ReactNode
  // default showTransactionSummary is true
  showTransactionSummary?: boolean
}

export const getStatusCopy = (order, logger?): StatusPageConfig => {
  if (!order) {
    return {}
  }

  const {
    paymentMethod,
    displayState,
    state,
    requestedFulfillment,
    mode,
    stateReason,
    stateExpiresAt,
  } = order
  const isOfferFlow = mode === "OFFER"
  const isPickup = requestedFulfillment?.__typename === "CommercePickup"
  const isArtaShipped: boolean =
    requestedFulfillment?.__typename === "CommerceShipArta"
  const isWireTransfer = paymentMethod === "WIRE_TRANSFER"

  switch (displayState) {
    case "SUBMITTED":
      return isOfferFlow
        ? {
            title: "Thank you, your offer has been submitted",
            description: (
              <>
                The seller will respond to your offer by {stateExpiresAt}. Keep
                in mind making an offer doesn’t guarantee you the work.
              </>
            ),
          }
        : {
            title: "Thank you, your order has been submitted",
            description: (
              <>You will receive a confirmation email by {stateExpiresAt}.</>
            ),
          }
    case "APPROVED":
      return {
        title: approvedTitle(isOfferFlow),
        description: isPickup ? (
          <>
            Thank you for your purchase. A specialist will contact you within 2
            business days to coordinate pickup.
          </>
        ) : (
          <>
            Thank you for your purchase. You will be notified when the work has
            shipped, typically within 5–7 business days.
          </>
        ),
      }
    case "PROCESSING":
      return {
        title: approvedTitle(isOfferFlow),
        description: (
          <>
            Thank you for your purchase. {deliverText(order)}More delivery
            information will be available once your order ships.
          </>
        ),
      }
    case "PROCESSING_APPROVAL":
      return {
        title: `${processingApprovalTitle(isOfferFlow, isWireTransfer)}`,
        description: isWireTransfer ? null : (
          <>
            Thank you for your purchase. {deliverText(order)}More delivery
            information will be available once your order ships.
          </>
        ),
        alertMessageTitle: isWireTransfer
          ? "Please proceed with the wire transfer to complete your purchase"
          : null,
        alertMessage: isWireTransfer ? (
          <>
            <Text>
              Please provide your proof of payment within 7 days. After this
              period, your order will be eligible for cancellation by the
              gallery.
            </Text>
            <Spacer y={2} />
            <Text>
              1. &nbsp; Find the order total and Artsy’s banking details below.
            </Text>
            <Text>
              2. &nbsp;Please inform your bank that you will be responsible for
              all wire transfer fees.
            </Text>
            <Text>
              3. &nbsp;Once you have made the transfer, please email
              orders@artsy.net with your proof of payment.
            </Text>
          </>
        ) : null,
        content: isWireTransfer ? (
          <>
            <Text
              variant={["xs", "sm-display"]}
              fontWeight="bold"
              color="black100"
            >
              Send wire transfer to
            </Text>
            <Spacer y={1} />
            <Text>Account name: Art.sy Inc.</Text>
            <Text>Account number: 4243851425</Text>
            <Text>Routing number: 121000248</Text>
            <Text>International SWIFT: WFBIUS6S</Text>
            <Spacer y={2} />
            <Text
              variant={["xs", "sm-display"]}
              fontWeight="bold"
              color="black100"
            >
              Bank address
            </Text>
            <Spacer y={1} />
            <Text>Wells Fargo Bank, N.A.</Text>
            <Text>420 Montgomery Street</Text>
            <Text>San Francisco, CA 9410</Text>
            <Spacer y={2} />
            <Text fontStyle="italic">
              Add order number #{order.code} to the notes section in your wire
              transfer.
            </Text>
          </>
        ) : null,
      }
    case "IN_TRANSIT":
      return {
        title: "Your order has shipped",
        description: shipmentDescription(isArtaShipped, false, order),
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
            description: shipmentDescription(isArtaShipped, true, order),
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
      return canceledOfferOrderCopy(order, logger)
    default:
      // This should not happen. Check the order displayState here:
      // https://github.com/artsy/exchange/blob/master/app/models/order.rb
      // (Aside from PENDING and ABANDONED)
      if (!!logger) {
        logger.error(`Unhandled order state: ${displayState} in ${state} state`)
      }
      return {
        title: "Your order",
        description: null,
      }
  }
}

export const canceledOfferOrderCopy = (order, logger?): StatusPageConfig => {
  // canceledOfferOrderCopy(): StatusPageConfig {
  const { stateReason } = order
  switch (stateReason) {
    case "buyer_rejected":
      return {
        title: "Offer declined",
        description: (
          <>
            Thank you for your response. The seller will be informed of your
            decision to end the negotiation process.
            <Spacer y={2} />
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
            Sorry, the seller declined your offer and has ended the negotiation
            process.
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
      if (!!logger) {
        logger.error(`Unhandled cancellation reason: ${stateReason}`)
      }

      return {
        title: "Offer declined",
        description: null,
        showTransactionSummary: false,
      }
  }
}

interface ShipmentData {
  shipperName: string | null
  trackingId: string | null
  trackingUrl: string | null
  estimatedDelivery: string | null
}

export const getShipmentInfo = (order): ShipmentData | null => {
  const fulfillment =
    order?.lineItems?.edges?.[0]?.node?.fulfillments?.edges?.[0]?.node

  const shipment = order?.lineItems?.edges?.[0]?.node?.shipment

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

export const shipmentDescription = (
  isArtaShipped: boolean,
  isDelivered: boolean,
  order
): React.ReactNode => {
  const shipmentData: ShipmentData | null = getShipmentInfo(order)

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
      <Spacer y={2} />
      {shipmentData.shipperName && (
        <>
          Shipper: {shipmentData.shipperName}
          <Spacer y={1} />
        </>
      )}
      {hasTrackingInfo &&
        trackingInfo(shipmentData.trackingId, shipmentData.trackingUrl)}
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

export const continueToInboxText =
  "Negotiation with the gallery will continue in the Inbox."

export const approvedTitle = (isOfferFlow): string => {
  return isOfferFlow ? "Offer accepted" : "Your order is confirmed"
}

export const processingApprovalTitle = (
  isOfferFlow,
  isWireTransfer
): string => {
  if (isWireTransfer) {
    return isOfferFlow
      ? "Thank you, your offer has been accepted"
      : "Thank you, your order has been accepted"
  }

  return isOfferFlow
    ? "Offer accepted. Payment processing."
    : "Your order is confirmed. Payment processing."
}

export const deliverText = (order): React.ReactNode => {
  const selectedShipping =
    order?.lineItems?.edges?.[0]?.node?.selectedShippingQuote?.typeName

  let daysToDeliver: string | null = null
  switch (selectedShipping) {
    case "next_day_air":
      daysToDeliver = "1 business day "
      break
    case "second_day_air":
      daysToDeliver = "2 business days"
      break
    case "priority":
      daysToDeliver = "2-4 business days"
      break
    case "ground":
    case "standard":
      daysToDeliver = "3-5 business days"
      break
    case "economy":
      daysToDeliver = "5-7 business days"
      break
  }
  return daysToDeliver
    ? `Your order will be delivered in ${daysToDeliver} once shipped, plus up to 7 days processing time. `
    : null
}

export const trackingInfo = (
  trackingId,
  trackingUrl
): React.ReactNode | null => {
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
      <Spacer y={1} />
    </>
  )
}
