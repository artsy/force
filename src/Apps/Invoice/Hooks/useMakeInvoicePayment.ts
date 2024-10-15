import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useMakeInvoicePaymentMutation } from "__generated__/useMakeInvoicePaymentMutation.graphql"

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
