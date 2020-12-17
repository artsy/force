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
        code: "insufficient_inventory",
        type: "processing",
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
        code: "insufficient_inventory",
        type: "processing",
      },
    },
  },
}
