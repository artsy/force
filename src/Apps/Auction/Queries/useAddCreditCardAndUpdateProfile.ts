import { useMutation } from "Utils/Hooks/useMutation"
import type { useAddCreditCardAndUpdateProfileMutation } from "__generated__/useAddCreditCardAndUpdateProfileMutation.graphql"
import { graphql } from "react-relay"

export const useAddCreditCardAndUpdateProfile = () => {
  return useMutation<useAddCreditCardAndUpdateProfileMutation>({
    mutation: graphql`
      mutation useAddCreditCardAndUpdateProfileMutation(
        $creditCardInput: CreditCardInput!
        $profileInput: UpdateMyProfileInput!
      ) {
        updateMyUserProfile(input: $profileInput) {
          user {
            internalID
          }
        }
        createCreditCard(input: $creditCardInput) {
          creditCardOrError {
            ... on CreditCardMutationSuccess {
              creditCardEdge {
                node {
                  lastDigits
                }
              }
            }
            ... on CreditCardMutationFailure {
              mutationError {
                type
                message
                detail
              }
            }
          }
        }
      }
    `,
  })
}
