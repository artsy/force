export const acceptOfferSuccess = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      order: {
        awaitingResponseFrom: null,
        internalID: "1234",
      },
    },
  },
}
export const acceptOfferFailed = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        code: "cannot_accept_offer",
        data: null,
        type: "validation",
      },
    },
  },
}

export const acceptOfferPaymentFailed = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        code: "capture_failed",
        data: null,
        type: "processing",
      },
    },
  },
}

export const acceptOfferPaymentFailedInsufficientFunds = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        code: "capture_failed",
        data: `{"decline_code": "insufficient_funds"}`,
        type: "processing",
      },
    },
  },
}

export const acceptOfferInsufficientInventoryFailure = {
  commerceBuyerAcceptOffer: {
    orderOrError: {
      error: {
        code: "insufficient_inventory",
        data: "No moar artwork (╯°□°）╯︵ ┻━┻",
        type: "processing",
      },
    },
  },
}
