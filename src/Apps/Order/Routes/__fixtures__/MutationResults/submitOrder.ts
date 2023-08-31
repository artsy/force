import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const submitOrderWithFailure = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}

export const submitOrderWithFailureCardDeclined = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card was declined.","decline_code":"card_declined"}',
      },
    },
  },
}

export const submitOrderWithFailureInsufficientFunds = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card has insufficient funds to complete the purchase.","decline_code":"insufficient_funds"}',
      },
    },
  },
}

export const submitOrderWithFailureCurrencyNotSupported = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "charge_authorization_failed",
        data:
          '{"id":null,"failure_code":"card_declined","failure_message":"Your card is not supported for this currency.","decline_code":"currency_not_supported"}',
      },
    },
  },
}

export const submitOrderWithVersionMismatchFailure = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "artwork_version_mismatch",
        data: null,
      },
    },
  },
}

export const submitOrderWithNoInventoryFailure = {
  commerceSubmitOrder: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: null,
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
        type: "processing",
        code: "missing_required_info",
        data: null,
      },
    },
  },
}
