import { BuyOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"

export const submitOrderWithFailure = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
        type: "validation",
      },
    },
  },
}

export const submitOrderWithFailureCardDeclined = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card was declined.","decline_code":"card_declined"}',
        type: "processing",
      },
    },
  },
}

export const submitOrderWithFailureInsufficientFunds = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card has insufficient funds to complete the purchase.","decline_code":"insufficient_funds"}',
        type: "processing",
      },
    },
  },
}

export const submitOrderWithVersionMismatchFailure = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "artwork_version_mismatch",
        data: null,
        type: "processing",
      },
    },
  },
}

export const submitOrderWithNoInventoryFailure = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "insufficient_inventory",
        data: null,
        type: "processing",
      },
    },
  },
}

export const submitOrderWithActionRequired = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderRequiresAction",
      actionData: {
        clientSecret: "client-secret",
      },
    },
  },
}

export const submitOrderSuccess = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationSuccess",
      order: {
        ...BuyOrderWithShippingDetails,
        state: "SUBMITTED",
      },
    },
  },
}

export const submitOrderWithMissingInfo = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        code: "missing_required_info",
        data: null,
        type: "processing",
      },
    },
  },
}
