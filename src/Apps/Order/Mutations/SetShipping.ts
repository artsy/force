import { graphql } from "react-relay"
import { SetShippingMutation } from "__generated__/SetShippingMutation.graphql"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"

export const setShipping = (
  commitMutation: CommitMutation,
  variables: SetShippingMutation["variables"]
) => {
  return commitMutation<SetShippingMutation>({
    variables,
    // TODO: Inputs to the mutation might have changed case of the keys!
    mutation: graphql`
      mutation SetShippingMutation($input: CommerceSetShippingInput!) {
        commerceSetShipping(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              __typename
              order {
                internalID
                state
                requestedFulfillment {
                  __typename
                  ... on CommerceShip {
                    name
                    addressLine1
                    addressLine2
                    city
                    region
                    country
                    postalCode
                    phoneNumber
                  }
                  ... on CommerceShipArta {
                    name
                    addressLine1
                    addressLine2
                    city
                    region
                    country
                    postalCode
                    phoneNumber
                  }
                }
                lineItems {
                  edges {
                    node {
                      shippingQuoteOptions {
                        edges {
                          ...ShippingQuotes_shippingQuotes
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
          }
        }
      }
    `,
  })
}
