import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2UpdateShippingAddressMutation as useOrder2UpdateShippingAddressType } from "__generated__/useOrder2UpdateShippingAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2UpdateShippingAddressMutation = () => {
  return useMutation<useOrder2UpdateShippingAddressType>({
    mutation: graphql`
      mutation useOrder2UpdateShippingAddressMutation(
        $input: updateOrderShippingAddressInput!
      ) {
        updateOrderShippingAddress(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...Order2CheckoutApp_order
                ...Order2CheckoutContext_order
                fulfillmentOptions {
                  type
                }
              }
            }
            ... on OrderMutationError {
              mutationError {
                message
                code
              }
            }
          }
        }
      }
    `,
  })
}
