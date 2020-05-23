import { RegisterCreateCreditCardAndUpdatePhoneMutationResponse } from "v2/__generated__/RegisterCreateCreditCardAndUpdatePhoneMutation.graphql"

export const createCreditCardAndUpdatePhoneSuccessful: RegisterCreateCreditCardAndUpdatePhoneMutationResponse = {
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

export const createCreditCardAndUpdatePhoneFailed: RegisterCreateCreditCardAndUpdatePhoneMutationResponse = {
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
