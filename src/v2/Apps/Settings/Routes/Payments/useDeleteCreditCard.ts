import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteCreditCardMutation } from "v2/__generated__/useDeleteCreditCardMutation.graphql"

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
