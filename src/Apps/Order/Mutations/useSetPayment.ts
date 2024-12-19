import { useMutation } from "Utils/Hooks/useMutation"
import type { useSetPaymentMutation } from "__generated__/useSetPaymentMutation.graphql"
import { graphql } from "react-relay"

export const useSetPayment = () => {
  return useMutation<useSetPaymentMutation>({
    mutation: graphql`
      mutation useSetPaymentMutation($input: CommerceSetPaymentInput!) {
        commerceSetPayment(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              order {
                id
                ...Payment_validation
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
