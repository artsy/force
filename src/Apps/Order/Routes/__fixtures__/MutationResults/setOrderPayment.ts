export const settingOrderPaymentSuccess = {
  commerceSetPayment: {
    orderOrError: {
      order: {
        __typename: "CommerceBuyOrder",
        id: "1234",
        paymentMethod: "CREDIT_CARD",
        creditCard: {
          id: "credit-card-id",
          internalID: "credit-card-id",
          name: "Artsy UK Ltd",
          street1: "14 Gower's Walk",
          street2: "Suite 2.5, The Loom",
          city: "London",
          state: "Whitechapel",
          country: "UK",
          postal_code: "E1 8PY",
        },
      },
    },
  },
}

export const settingOrderPaymentFailed = {
  commerceSetPayment: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_state",
        data: '{"state":"canceled"}',
      },
    },
  },
}
