import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteCreditCardMutation } from "__generated__/useDeleteCreditCardMutation.graphql"

export const useDeleteCreditCard = () => {
  return useMutation<useDeleteCreditCardMutation>({
    mutation: graphql`
      mutation useDeleteCreditCardMutation($input: DeleteCreditCardInput!) {
        deleteCreditCard(input: $input) {
          me {
            ...SettingsPaymentsMethods_me
          }
          creditCardOrError {
            ... on CreditCardMutationSuccess {
              creditCard {
                ...SettingsCreditCard_creditCard
              }
            }
            ... on CreditCardMutationFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })
}
