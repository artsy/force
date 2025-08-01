import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SetOrderDeliveryAddressMutation as useOrder2SetOrderDeliveryAddressMutationType } from "__generated__/useOrder2SetOrderDeliveryAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2SetOrderDeliveryAddressMutation = () => {
  return useMutation<useOrder2SetOrderDeliveryAddressMutationType>({
    mutation: graphql`
      mutation useOrder2SetOrderDeliveryAddressMutation(
        $input: updateOrderShippingAddressInput!
      ) {
        updateOrderShippingAddress(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
                ...Order2CheckoutContext_order
                ...Order2CheckoutApp_order
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
