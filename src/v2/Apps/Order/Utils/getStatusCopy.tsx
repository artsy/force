import { Spacer } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

interface StatusPageConfig {
  title?: React.ReactNode
  description?: React.ReactNode
  // default showTransactionSummary is true
  showTransactionSummary?: boolean
}

export const getStatusCopy = (order, logger?): StatusPageConfig => {
  if (!order) {
    return {}
  }

  const {
    displayState,
    state,
    paymentMethod,
    requestedFulfillment,
    mode,
    stateReason,
    stateExpiresAt,
  } = order
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
                The seller will respond to your offer by {stateExpiresAt}. Keep
                in mind making an offer doesn’t guarantee you the work.
              </>
            ),
          }
        : paymentMethod === "WIRE_TRANSFER"
        ? {
            title: "Your order has been submitted",
            description: (
              <>
                Thank you for your purchase. After your order is confirmed, a
                specialist will contact you to coordinate pickup.
              </>
            ),
          }
        : {
            title: "Your order has been submitted",
            description: (
              <>
                Thank you for your purchase. You will receive a confirmation
                email by {stateExpiresAt}.{covidNote()}
              </>
            ),
          }
    case "APPROVED":
      return {
        title: approvedTitle(isOfferFlow),
        description: isPickup ? (
          <>
            Thank you for your purchase. A specialist will contact you within 2
            business days to coordinate pickup.
            {covidNote()}
          </>
        ) : (
          <>
            Thank you for your purchase. You will be notified when the work has
            shipped, typically within 5–7 business days.
            {covidNote()}
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
            {covidNote()}
          </>
        ),
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
      <Spacer mb={2} />
      {shipmentData.shipperName && (
        <>
          Shipper: {shipmentData.shipperName}
          <Spacer mb={1} />
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

export const covidNote = (): React.ReactNode => {
  return (
    <>
      <Spacer mb={1} />
      Disruptions caused by COVID-19 may cause delays — we appreciate your
      understanding.
    </>
  )
}

export const continueToInboxText =
  "Negotiation with the gallery will continue in the Inbox."

export const approvedTitle = (isOfferFlow): string => {
  return isOfferFlow ? "Offer accepted" : "Your order is confirmed"
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
      <Spacer mb={1} />
    </>
  )
}
