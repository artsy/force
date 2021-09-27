const creditCard = {
  internalID: "gravityCreditCardId",
  name: "Artsy UK Ltd",
  street1: "14 Gower's Walk",
  street2: "Suite 2.5, The Loom",
  city: "London",
  state: "Whitechapel",
  country: "GB",
  postalCode: "E1 8PY",
  expirationMonth: 12,
  expirationYear: 2022,
  lastDigits: "1234",
  brand: "Visa",
}

export const creatingCreditCardEdgeSuccess = {
  createCreditCard: {
    creditCardOrError: {
      creditCardEdge: {
        node: creditCard,
      },
    },
  },
}

export const creatingCreditCardSuccess = {
  createCreditCard: {
    creditCardOrError: {
      creditCard,
    },
  },
}

export const creatingCreditCardFailed = {
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        type: "payment_error",
        message: "Payment error",
        detail: "No such token: fake-token",
        error: null,
      },
    },
  },
}
