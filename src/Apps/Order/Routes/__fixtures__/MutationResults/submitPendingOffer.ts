import { OfferOrderWithOffers } from "Apps/__tests__/Fixtures/Order"

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
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}

export const insufficientInventoryResponse = {
  commerceSubmitPendingOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}
