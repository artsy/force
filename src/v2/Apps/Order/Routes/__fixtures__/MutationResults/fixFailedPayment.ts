import { OfferOrderWithShippingDetailsAndNote } from "v2/Apps/__tests__/Fixtures/Order"

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
        code: "capture_failed",
        data: "Failed to capture payment",
        type: "processing",
      },
    },
  },
}

export const fixFailedPaymentInsufficientInventoryFailure = {
  commerceFixFailedPayment: {
    orderOrError: {
      error: {
        code: "insufficient_inventory",
        data: "No moar artwork (╯°□°）╯︵ ┻━┻",
        type: "processing",
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
