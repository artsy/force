import { CommerceBuyerOfferActionEnum } from "v2/__generated__/ConversationCTA_conversation.graphql"

export const returnOrderModalDetails = ({
  kind,
  orderID,
}: {
  kind: CommerceBuyerOfferActionEnum
  orderID: string
}) => {
  let ctaAttributes: {
    url: string
    modalTitle: string
  }

  switch (kind) {
    case "PAYMENT_FAILED": {
      ctaAttributes = {
        url: `/orders/${orderID}/payment/new`,
        modalTitle: "Update Payment Details",
      }
      break
    }
    case "OFFER_RECEIVED": {
      ctaAttributes = {
        url: `/orders/${orderID}/respond`,
        modalTitle: "Review Offer",
      }
      break
    }
    case "OFFER_ACCEPTED": {
      ctaAttributes = {
        url: `/orders/${orderID}/status`,
        modalTitle: "Offer Accepted",
      }
      break
    }
    case "OFFER_ACCEPTED_CONFIRM_NEEDED": {
      ctaAttributes = {
        url: `/orders/${orderID}/respond`,
        modalTitle: "Review Offer",
      }
      break
    }
    case "OFFER_RECEIVED_CONFIRM_NEEDED": {
      ctaAttributes = {
        url: `/orders/${orderID}/respond`,
        modalTitle: "Review Offer",
      }
      break
    }
    case "PROVISIONAL_OFFER_ACCEPTED": {
      ctaAttributes = {
        url: `/orders/${orderID}/status`,
        modalTitle: "Offer Accepted",
      }
      break
    }
    default: {
      // this should never happen
      // return null
      return {}
    }
  }

  const { url, modalTitle } = ctaAttributes

  return {
    url,
    modalTitle,
  }
}
