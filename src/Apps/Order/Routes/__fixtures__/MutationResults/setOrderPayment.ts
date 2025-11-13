export const settingOrderPaymentFailed = {
  commerceSetPayment: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        __typename: "CommerceApplicationError",
        type: "validation",
        code: "invalid_state",
        data: '{"state":"canceled"}',
      },
    },
  },
}
