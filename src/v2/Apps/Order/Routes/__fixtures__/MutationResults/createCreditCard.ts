export const creatingCreditCardSuccess = {
  createCreditCard: {
    creditCardOrError: {
      creditCard: {
        city: "London",
        country: "UK",
        brand: "Visa",
        expirationMonth: 12,
        expirationYear: 2022,
        internalID: "gravityCreditCardId",
        lastDigits: "1234",
        name: "Artsy UK Ltd",
        postalCode: "E1 8PY",
        state: "Whitechapel",
        street1: "14 Gower's Walk",
        street2: "Suite 2.5, The Loom",
      },
    },
  },
}

export const creatingCreditCardFailed = {
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        detail: "No such token: fake-token",
        error: null,
        message: "Payment error",
        type: "payment_error",
      },
    },
  },
}
