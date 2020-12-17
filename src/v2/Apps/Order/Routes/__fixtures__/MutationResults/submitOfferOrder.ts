import { OfferOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"

export const submitOfferOrderWithFailure = {
  commerceSubmitOrderWithOffer: {
    orderOrError: {
      error: {
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
        type: "validation",
      },
    },
  },
}

export const submitOfferOrderFailedConfirmation = {
  commerceSubmitOrderWithOffer: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "payment_method_confirmation_failed",
        data: null,
        type: "processing",
      },
    },
  },
}

export const submitOfferOrderWithVersionMismatchFailure = {
  commerceSubmitOrderWithOffer: {
    orderOrError: {
      error: {
        code: "artwork_version_mismatch",
        data: null,
        type: "processing",
      },
    },
  },
}

export const submitOfferOrderWithNoInventoryFailure = {
  commerceSubmitOrderWithOffer: {
    orderOrError: {
      error: {
        code: "insufficient_inventory",
        data: null,
        type: "processing",
      },
    },
  },
}

export const submitOfferOrderWithActionRequired = {
  commerceSubmitOrderWithOffer: {
    orderOrError: {
      actionData: {
        clientSecret: "client-secret",
      },
    },
  },
}

export const submitOfferOrderSuccess = {
  commerceSubmitOrderWithOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
      },
    },
  },
}
