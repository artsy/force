import { CreateCreditCardAndUpdatePhoneMutationResponse } from "v2/__generated__/CreateCreditCardAndUpdatePhoneMutation.graphql"

export const createCreditCardAndUpdatePhoneSuccessful: CreateCreditCardAndUpdatePhoneMutationResponse = {
  createCreditCard: {
    creditCardOrError: {
      creditCardEdge: {
        node: {
          lastDigits: "4242",
        },
      },
    },
  },
  updateMyUserProfile: {
    user: {
      internalID: "example-user-id",
    },
  },
}

export const createCreditCardAndUpdatePhoneFailed: CreateCreditCardAndUpdatePhoneMutationResponse = {
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        detail: "Your card was declined.",
        message: "Payment information could not be processed.",
        type: "payment_error",
      },
    },
  },
  updateMyUserProfile: {
    user: {
      internalID: "example-user-id",
    },
  },
}
