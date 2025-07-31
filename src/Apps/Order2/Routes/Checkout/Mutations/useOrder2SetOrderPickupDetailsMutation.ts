import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SetOrderPickupDetailsMutation as useOrder2SetOrderPickupDetailsMutationType } from "__generated__/useOrder2SetOrderPickupDetailsMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2SetOrderPickupDetailsMutation = () => {
  return useMutation<useOrder2SetOrderPickupDetailsMutationType>({
    mutation: graphql`
      mutation useOrder2SetOrderPickupDetailsMutation(
        $input: updateOrderShippingAddressInput!
      ) {
        updateOrderShippingAddress(input: $input) {
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
