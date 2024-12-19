import { useMutation } from "Utils/Hooks/useMutation"
import type { useMakeInvoicePaymentMutation } from "__generated__/useMakeInvoicePaymentMutation.graphql"
import { graphql } from "react-relay"

export const useMakeInvoicePayment = () => {
  return useMutation<useMakeInvoicePaymentMutation>({
    mutation: graphql`
      mutation useMakeInvoicePaymentMutation(
        $input: CreateInvoicePaymentInput!
      ) {
        createInvoicePayment(input: $input) {
          __typename

          responseOrError {
            ... on CreateInvoicePaymentFailure {
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
