export const rejectOfferSuccess = {
  commerceBuyerRejectOffer: {
    orderOrError: {
      order: {
        awaitingResponseFrom: null,
        internalID: "1234",
      },
    },
  },
}
export const rejectOfferFailed = {
  commerceBuyerRejectOffer: {
    orderOrError: {
      error: {
        code: "cannot_accept_offer",
        data: null,
        type: "validation",
      },
    },
  },
}
