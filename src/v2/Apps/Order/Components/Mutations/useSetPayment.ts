import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useSetPaymentMutation } from "v2/__generated__/useSetPaymentMutation.graphql"

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
