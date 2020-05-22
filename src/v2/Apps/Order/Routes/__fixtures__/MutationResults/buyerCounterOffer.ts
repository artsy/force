import { OfferOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"
import { DateTime } from "luxon"

export const buyerCounterOfferSuccess = {
  commerceBuyerCounterOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        stateExpiresAt: DateTime.local()
          .plus({ days: 1 })
          .toString(),
      },
    },
  },
}
export const buyerCounterOfferFailed = {
  commerceBuyerCounterOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_amount_cents",
        data: null,
      },
    },
  },
}
