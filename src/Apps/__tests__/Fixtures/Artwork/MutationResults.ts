export const OrderWithSuccess = {
  commerceCreateOrderWithArtwork: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationSuccess",
      order: {
        internalID: "orderId",
        mode: "BUY",
      },
    },
  },
}

export const OrderWithFailure = {
  commerceCreateOrderWithArtwork: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "insufficient_inventory",
      },
    },
  },
}

export const OfferOrderWithSuccess = {
  commerceCreateOfferOrderWithArtwork: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        internalID: "orderId",
        mode: "OFFER",
      },
    },
  },
}

export const OfferOrderWithFailure = {
  commerceCreateOfferOrderWithArtwork: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "processing",
        code: "insufficient_inventory",
      },
    },
  },
}
