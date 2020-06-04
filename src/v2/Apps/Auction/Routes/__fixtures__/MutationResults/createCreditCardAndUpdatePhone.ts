import { CreateCreditCardAndUpdatePhoneMutationResponse } from "v2/__generated__/CreateCreditCardAndUpdatePhoneMutation.graphql"

export const createCreditCardAndUpdatePhoneSuccessful: CreateCreditCardAndUpdatePhoneMutationResponse = {
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

export const createCreditCardAndUpdatePhoneFailed: CreateCreditCardAndUpdatePhoneMutationResponse = {
  updateMyUserProfile: {
    user: {
      internalID: "example-user-id",
    },
  },
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        message: "The `createCreditCard` mutation failed.",
        type: "",
        detail: "",
      },
    },
  },
}
