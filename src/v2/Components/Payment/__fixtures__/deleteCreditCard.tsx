export const deletingCreditCardSuccess = {
  deleteCreditCard: {
    creditCardOrError: {
      creditCard: {
        id: "gravityCreditCardId",
      },
    },
  },
}

export const deletingCreditCardFailed = {
  deleteCreditCard: {
    creditCardOrError: {
      mutationError: {
        type: "payment_error",
        message: "Payment error",
        detail: "No card found",
        error: null,
      },
    },
  },
}
