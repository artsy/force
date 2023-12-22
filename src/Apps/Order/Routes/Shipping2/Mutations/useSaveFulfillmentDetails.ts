import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useSaveFulfillmentDetailsMutation } from "__generated__/useSaveFulfillmentDetailsMutation.graphql"

export const useSaveFulfillmentDetails = () => {
  return useMutation<useSaveFulfillmentDetailsMutation>({
    mutation: graphql`
      mutation useSaveFulfillmentDetailsMutation(
        $input: CommerceSetShippingInput!
      ) {
        commerceSetShipping(input: $input) {
          orderOrError {
            __typename
            ... on CommerceOrderWithMutationSuccess {
              order {
                internalID
                __typename
                ... on CommerceOrder {
                  ...Shipping2_order
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
            ... on CommerceOrderRequiresAction {
              __typename
            }
          }
        }
      }
    `,
  })
}
