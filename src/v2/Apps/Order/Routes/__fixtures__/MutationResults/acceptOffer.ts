export const acceptOfferSuccess = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      order: {
        internalID: "1234",
        awaitingResponseFrom: null,
      },
    },
  },
}
export const acceptOfferFailed = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cannot_accept_offer",
        data: null,
      },
    },
  },
}

export const acceptOfferPaymentFailed = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "capture_failed",
        data: null,
      },
    },
  },
}

export const acceptOfferPaymentFailedInsufficientFunds = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "capture_failed",
        data: `{"decline_code": "insufficient_funds"}`,
      },
    },
  },
}

export const acceptOfferInsufficientInventoryFailure = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: "No moar artwork (╯°□°）╯︵ ┻━┻",
      },
    },
  },
}
