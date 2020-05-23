export const rejectOfferSuccess = {
  commerceBuyerRejectOffer: {
    orderOrError: {
      order: {
        internalID: "1234",
        awaitingResponseFrom: null,
      },
    },
  },
}
export const rejectOfferFailed = {
  commerceBuyerRejectOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}
