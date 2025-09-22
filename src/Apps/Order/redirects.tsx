import { get } from "Utils/get"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import type { RedirectPredicate, RedirectRecord } from "./getRedirect"

import type { SystemContextProps } from "System/Contexts/SystemContext"
import { extractNodes } from "Utils/extractNodes"
import type { redirects_order$data } from "__generated__/redirects_order.graphql"

interface OrderQuery {
  order: redirects_order$data
  featureFlags: SystemContextProps["featureFlags"]
}

type OrderPredicate = RedirectPredicate<OrderQuery>

const goToDetailsIf =
  (pred: (order: redirects_order$data) => boolean, reason): OrderPredicate =>
  ({ order }) => {
    if (pred(order)) {
      return {
        path: `/orders/${order.internalID}/details`,
        reason,
      }
    }
  }

const goToArtworkIfOrderWasAbandoned: OrderPredicate = ({ order }) => {
  if (order.state === "ABANDONED") {
    const artworkID = get(
      order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.slug,
    )
    // If an artwork ID can't be found, redirect back to home page.
    return {
      path: artworkID ? `/artwork/${artworkID}` : "/",
      reason: "Order was abandoned",
    }
  }
}

const goToDetailsIfOrderIsNotPending = goToDetailsIf(
  order => order.state !== "PENDING",
  "Order is no longer pending",
)

const goToShippingIfShippingIsNotCompleted: OrderPredicate = ({ order }) => {
  if (
    !order.requestedFulfillment ||
    (order.requestedFulfillment.__typename === "CommerceShipArta" &&
      !extractNodes(
        extractNodes(order.lineItems)?.[0].shippingQuoteOptions,
      ).find(shippingQuote => shippingQuote.isSelected))
  ) {
    return {
      path: `/orders/${order.internalID}/shipping`,
      reason: "Shipping was not yet completed",
    }
  }
}

const goToPaymentIfPaymentIsNotCompleted: OrderPredicate = ({ order }) => {
  if (!order.paymentSet) {
    return {
      path: `/orders/${order.internalID}/payment`,
      reason: "Payment was not yet completed",
    }
  }
}

const goToPaymentIfPrivateSaleOrder: OrderPredicate = ({ order }) => {
  if (order.source === "private_sale") {
    return {
      path: `/orders/${order.internalID}/payment`,
      reason: "Private sale orders are created with shipping details",
    }
  }
}

const goToShippingIfOrderIsNotOfferOrder: OrderPredicate = ({ order }) => {
  if (order.mode !== "OFFER") {
    return {
      path: `/orders/${order.internalID}/shipping`,
      reason: "Order is not an offer order",
    }
  }
}

const goToOfferIfNoOfferMade: OrderPredicate = ({ order }) => {
  if (order.mode === "OFFER" && !order.myLastOffer) {
    return {
      path: `/orders/${order.internalID}/offer`,
      reason: "No offer has been made yet",
    }
  }
}

const goToDetailsIfNotOfferOrder = goToDetailsIf(
  order => order.mode !== "OFFER",
  "Not an offer order",
)

const goToDetailsIfBuyNowCreditCardOrder = goToDetailsIf(
  order => order.paymentMethod === "CREDIT_CARD" && order.mode === "BUY",
  "Order paid by credit card must be offer",
)

const goToDetailsIfNotAwaitingBuyerResponse = goToDetailsIf(
  order => order.awaitingResponseFrom !== "BUYER",
  "Not currently awaiting buyer response",
)

// displayState is used here since an order may be in_review, in which case
// it is still "submitted" to the user and we shouldn't redirect
const goToDetailsIfOrderIsNotSubmitted = goToDetailsIf(
  order => order.displayState !== "SUBMITTED",
  "Order was not yet submitted",
)

const goToDetailsIfNotLastTransactionFailed = goToDetailsIf(
  order => !(order.lastTransactionFailed && order.state === "SUBMITTED"),
  "Order's lastTransactionFailed must be true + state submitted",
)

const goToNewPaymentIfOfferLastTransactionFailed = ({ order }) => {
  if (
    order.mode === "OFFER" &&
    order.lastTransactionFailed &&
    order.state === "SUBMITTED"
  ) {
    return {
      path: `/orders/${order.internalID}/payment/new`,
      reason: "No payment has been successfully made",
    }
  }
}

const goToReviewIfOrderIsPending: OrderPredicate = ({ order }) => {
  if (order.state === "PENDING") {
    return {
      path: `/orders/${order.internalID}/review`,
      reason: "Order is still pending",
    }
  }
}

const goToRespondIfMyLastOfferIsNotMostRecentOffer: OrderPredicate = ({
  order,
}) => {
  if (
    order.myLastOffer &&
    order.lastOffer &&
    DateTime.fromISO(order.myLastOffer.createdAt) >
      DateTime.fromISO(order.lastOffer.createdAt)
  ) {
    return
  }
  return {
    path: `/orders/${order.internalID}/respond`,
    reason: "myLastOffer is not most recent offer",
  }
}

const goToRespondIfAwaitingBuyerResponse: OrderPredicate = ({ order }) => {
  if (order.awaitingResponseFrom === "BUYER") {
    if (order.displayState === "PAYMENT_FAILED") {
      return {
        path: `/orders/${order.internalID}/payment/new`,
        reason: "Payment failed",
      }
    }
    return {
      path: `/orders/${order.internalID}/respond`,
      reason: "Still awaiting buyer response",
    }
  }
}

const goToOrderDetails: OrderPredicate = ({ order }) => {
  return {
    path: `/orders/${order.internalID}/details`,
    reason: "Order details page is ready for this order",
  }
}

const goToOrder2CheckoutIfEnabled: OrderPredicate = ({
  order,
  featureFlags,
}) => {
  if (newCheckoutEnabled({ order, featureFlags })) {
    return {
      path: `/orders2/${order.internalID}/checkout`,
      reason: "Order2 is enabled for this order",
    }
  }
}

// Temporary type to allow orders queried for the new checkout page to work here
interface Order2RedirectArgs {
  order: { mode?: string | null }
  featureFlags?: SystemContextProps["featureFlags"]
}
export const newCheckoutEnabled = ({
  order,
  featureFlags,
}: Order2RedirectArgs): boolean => {
  // Enable for BUY mode when feature flag is on
  if (
    order.mode === "BUY" &&
    featureFlags?.isEnabled("emerald_checkout-redesign")
  ) {
    return true
  }

  // Enable for OFFER mode orders (for new offer flow)
  if (order.mode === "OFFER") {
    return true
  }

  return false
}

export const redirects: RedirectRecord<OrderQuery> = {
  path: "",
  rules: [goToArtworkIfOrderWasAbandoned],
  children: [
    {
      path: "respond",
      rules: [
        goToDetailsIfNotOfferOrder,
        goToDetailsIfNotAwaitingBuyerResponse,
        goToDetailsIfOrderIsNotSubmitted,
        goToNewPaymentIfOfferLastTransactionFailed,
      ],
    },
    {
      path: "offer",
      rules: [
        goToDetailsIfOrderIsNotPending,
        goToShippingIfOrderIsNotOfferOrder,
        goToOrder2CheckoutIfEnabled,
      ],
    },
    {
      path: "shipping",
      rules: [
        goToPaymentIfPrivateSaleOrder,
        goToDetailsIfOrderIsNotPending,
        goToOfferIfNoOfferMade,
        goToOrder2CheckoutIfEnabled,
      ],
    },
    {
      path: "payment",
      rules: [
        goToDetailsIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
        goToOrder2CheckoutIfEnabled,
      ],
    },
    {
      path: "payment/new",
      rules: [
        goToDetailsIfBuyNowCreditCardOrder,
        goToDetailsIfNotLastTransactionFailed,
      ],
    },
    {
      path: "review",
      rules: [
        goToDetailsIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
        goToOrder2CheckoutIfEnabled,
      ],
    },
    {
      path: "review/counter",
      rules: [
        goToDetailsIfNotOfferOrder,
        goToDetailsIfNotAwaitingBuyerResponse,
        goToDetailsIfOrderIsNotSubmitted,
        goToRespondIfMyLastOfferIsNotMostRecentOffer,
      ],
    },
    {
      path: "review/accept",
      rules: [
        goToDetailsIfNotOfferOrder,
        goToDetailsIfNotAwaitingBuyerResponse,
        goToDetailsIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "review/decline",
      rules: [
        goToDetailsIfNotOfferOrder,
        goToDetailsIfNotAwaitingBuyerResponse,
        goToDetailsIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "status",
      rules: [goToOrderDetails],
    },
    {
      path: "details",
      rules: [
        goToReviewIfOrderIsPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
        goToRespondIfAwaitingBuyerResponse,
      ],
    },
  ],
}

graphql`
  fragment redirects_order on CommerceOrder {
    bankAccountId
    internalID
    mode
    state
    displayState
    source
    lastTransactionFailed
    paymentSet
    ... on CommerceOfferOrder {
      myLastOffer {
        internalID
        createdAt
      }
      lastOffer {
        internalID
        createdAt
      }
      awaitingResponseFrom
    }
    requestedFulfillment {
      __typename
    }
    lineItems {
      edges {
        node {
          artwork {
            slug
          }
          shippingQuoteOptions {
            edges {
              node {
                isSelected
              }
            }
          }
        }
      }
    }
    creditCard {
      internalID
    }
    ...Payment_validation @relay(mask: false)
  }
`
