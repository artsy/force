import { CreateCreditCardAndUpdatePhoneMutation$data } from "v2/__generated__/CreateCreditCardAndUpdatePhoneMutation.graphql"

export const createCreditCardAndUpdatePhoneSuccessful: CreateCreditCardAndUpdatePhoneMutation$data = {
  updateMyUserProfile: {
    user: {
      internalID: "example-user-id",
    },
  },
  createCreditCard: {
    creditCardOrError: {
      creditCardEdge: {
        node: {
          lastDigits: "4242",
        },
      },
    },
  },
}

export const createCreditCardAndUpdatePhoneFailed: CreateCreditCardAndUpdatePhoneMutation$data = {
  updateMyUserProfile: {
    user: {
      internalID: "example-user-id",
    },
  },
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        message: "Payment information could not be processed.",
        type: "payment_error",
        detail: "Your card was declined.",
      },
    },
  },
}
