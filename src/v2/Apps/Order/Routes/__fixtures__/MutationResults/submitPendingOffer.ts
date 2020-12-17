import { OfferOrderWithOffers } from "v2/Apps/__tests__/Fixtures/Order"

export const submitPendingOfferSuccess = {
  commerceSubmitPendingOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithOffers,
      },
    },
  },
}
export const submitPendingOfferFailed = {
  commerceSubmitPendingOffer: {
    orderOrError: {
      error: {
        code: "cannot_accept_offer",
        data: null,
        type: "validation",
      },
    },
  },
}

export const insufficientInventoryResponse = {
  commerceSubmitPendingOffer: {
    orderOrError: {
      error: {
        code: "insufficient_inventory",
        data: null,
        type: "validation",
      },
    },
  },
}
