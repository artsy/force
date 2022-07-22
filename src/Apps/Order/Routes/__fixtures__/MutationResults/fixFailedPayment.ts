import { OfferOrderWithShippingDetailsAndNote } from "Apps/__tests__/Fixtures/Order"

export const fixFailedPaymentSuccess = {
  commerceFixFailedPayment: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetailsAndNote,
      },
    },
  },
}

export const fixFailedPaymentFailure = {
  commerceFixFailedPayment: {
    orderOrError: {
      error: {
        type: "processing",
        code: "capture_failed",
        data: "Failed to capture payment",
      },
    },
  },
}

export const fixFailedPaymentInsufficientInventoryFailure = {
  commerceFixFailedPayment: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: "No moar artwork (╯°□°）╯︵ ┻━┻",
      },
    },
  },
}

export const fixFailedPaymentWithActionRequired = {
  commerceFixFailedPayment: {
    orderOrError: {
      __typename: "CommerceOrderRequiresAction",
      actionData: {
        clientSecret: "client-secret",
      },
    },
  },
}
