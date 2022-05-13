import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"

export const useSetPayment = () => {
  return useMutation({
    mutation: graphql`
      mutation useSetPaymentMutation($input: CommerceSetPaymentInput!) {
        commerceSetPayment(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              order {
                id
                creditCard {
                  internalID
                }
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}
