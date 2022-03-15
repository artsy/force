import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useAddCreditCardAndUpdateProfileMutation } from "v2/__generated__/useAddCreditCardAndUpdateProfileMutation.graphql"

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
