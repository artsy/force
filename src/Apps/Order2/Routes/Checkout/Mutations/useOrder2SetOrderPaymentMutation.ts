import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SetOrderPaymentMutation as useOrder2SetOrderPaymentMutationType } from "__generated__/useOrder2SetOrderPaymentMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2SetOrderPaymentMutation = () => {
  return useMutation<useOrder2SetOrderPaymentMutationType>({
    mutation: graphql`
      mutation useOrder2SetOrderPaymentMutation($input: updateOrderInput!) {
        updateOrder(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...Order2CheckoutContext_order
                ...Order2CheckoutApp_order
              }
            }
            ... on OrderMutationError {
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
