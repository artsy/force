export const settingOrderPaymentSuccess = {
  commerceSetPayment: {
    orderOrError: {
      order: {
        __typename: "CommerceBuyOrder",
        creditCard: {
          city: "London",
          country: "UK",
          id: "credit-card-id",
          internalID: "credit-card-id",
          name: "Artsy UK Ltd",
          postal_code: "E1 8PY",
          state: "Whitechapel",
          street1: "14 Gower's Walk",
          street2: "Suite 2.5, The Loom",
        },
        id: "1234",
      },
    },
  },
}

export const settingOrderPaymentFailed = {
  commerceSetPayment: {
    orderOrError: {
      error: {
        code: "invalid_state",
        data: '{"state":"canceled"}',
        type: "validation",
      },
    },
  },
}
