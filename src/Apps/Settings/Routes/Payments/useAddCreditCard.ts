import { useMutation } from "Utils/Hooks/useMutation"
import type { useAddCreditCardMutation } from "__generated__/useAddCreditCardMutation.graphql"
import { graphql } from "react-relay"

export const useAddCreditCard = () => {
  return useMutation<useAddCreditCardMutation>({
    mutation: graphql`
      mutation useAddCreditCardMutation($input: CreditCardInput!) {
        createCreditCard(input: $input) {
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
