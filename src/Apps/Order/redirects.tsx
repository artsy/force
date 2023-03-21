import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { get } from "Utils/get"
import { RedirectPredicate, RedirectRecord } from "./getRedirect"

import { redirects_order$data } from "__generated__/redirects_order.graphql"
import { extractNodes } from "Utils/extractNodes"
import { isPaymentSet } from "./Utils/orderUtils"

interface OrderQuery {
  order: redirects_order$data
}

type OrderPredicate = RedirectPredicate<OrderQuery>

const goToStatusIf = (
  pred: (order: redirects_order$data) => boolean,
  reason
): OrderPredicate => ({ order }) => {
  if (pred(order)) {
    return {
      path: `/orders/${order.internalID}/status`,
      reason,
    }
  }
}

const goToArtworkIfOrderWasAbandoned: OrderPredicate = ({ order }) => {
  if (order.state === "ABANDONED") {
    const artworkID = get(
      order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.slug
    )
    // If an artwork ID can't be found, redirect back to home page.
    return {
      path: artworkID ? `/artwork/${artworkID}` : "/",
      reason: "Order was abandoned",
    }
  }
}

const goToStatusIfOrderIsNotPending = goToStatusIf(
  order => order.state !== "PENDING",
  "Order is no longer pending"
)

const goToShippingIfShippingIsNotCompleted: OrderPredicate = ({ order }) => {
  if (
    !order.requestedFulfillment ||
    (order.requestedFulfillment.__typename === "CommerceShipArta" &&
      !extractNodes(
        extractNodes(order.lineItems)?.[0].shippingQuoteOptions
      ).find(shippingQuote => shippingQuote.isSelected))
  ) {
    return {
      path: `/orders/${order.internalID}/shipping`,
      reason: "Shipping was not yet completed",
    }
  }
}

const goToPaymentIfPaymentIsNotCompleted: OrderPredicate = ({ order }) => {
  if (!isPaymentSet(order.paymentMethodDetails)) {
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

const goToStatusIfNotOfferOrder = goToStatusIf(
  order => order.mode !== "OFFER",
  "Not an offer order"
)

const goToStatusIfBuyNowCreditCardOrder = goToStatusIf(
  order => order.paymentMethod === "CREDIT_CARD" && order.mode === "BUY",
  "Order paid by credit card must be offer"
)

const goToStatusIfNotAwaitingBuyerResponse = goToStatusIf(
  order => order.awaitingResponseFrom !== "BUYER",
  "Not currently awaiting buyer response"
)

// displayState is used here since an order may be in_review, in which case
// it is still "submitted" to the user and we shouldn't redirect
const goToStatusIfOrderIsNotSubmitted = goToStatusIf(
  order => order.displayState !== "SUBMITTED",
  "Order was not yet submitted"
)

const goToStatusIfNotLastTransactionFailed = goToStatusIf(
  order => !order.lastTransactionFailed,
  "Order's lastTransactionFailed must be true"
)

const goToNewPaymentIfOfferLastTransactionFailed = ({ order }) => {
  if (order.mode === "OFFER" && order.lastTransactionFailed) {
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
    return {
      path: `/orders/${order.internalID}/respond`,
      reason: "Still awaiting buyer response",
    }
  }
}

export const redirects: RedirectRecord<OrderQuery> = {
  path: "",
  rules: [goToArtworkIfOrderWasAbandoned],
  children: [
    {
      path: "respond",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
        goToNewPaymentIfOfferLastTransactionFailed,
      ],
    },
    {
      path: "offer",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfOrderIsNotOfferOrder,
      ],
    },
    {
      path: "shipping",
      rules: [
        goToPaymentIfPrivateSaleOrder,
        goToStatusIfOrderIsNotPending,
        goToOfferIfNoOfferMade,
      ],
    },
    {
      path: "payment",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
      ],
    },
    {
      path: "payment/new",
      rules: [
        goToStatusIfBuyNowCreditCardOrder,
        goToStatusIfOrderIsNotSubmitted,
        goToStatusIfNotLastTransactionFailed,
      ],
    },
    {
      path: "review",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
      ],
    },
    {
      path: "review/counter",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
        goToRespondIfMyLastOfferIsNotMostRecentOffer,
      ],
    },
    {
      path: "review/accept",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "review/decline",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "status",
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
