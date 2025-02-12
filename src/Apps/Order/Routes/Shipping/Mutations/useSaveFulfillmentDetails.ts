import { useMutation } from "Utils/Hooks/useMutation"
import type { useSaveFulfillmentDetailsMutation } from "__generated__/useSaveFulfillmentDetailsMutation.graphql"
import { graphql } from "react-relay"

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
                ...Shipping_order
                shippingTotalCents
                lineItems {
                  edges {
                    node {
                      shippingQuoteOptions {
                        edges {
                          node {
                            id
                            isSelected
                            tier
                            name
                          }
                        }
                      }
                    }
                  }
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
