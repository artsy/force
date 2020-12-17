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
        detail: "No card found",
        error: null,
        message: "Payment error",
        type: "payment_error",
      },
    },
  },
}
