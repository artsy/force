import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useAddCreditCardMutation } from "v2/__generated__/useAddCreditCardMutation.graphql"

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
