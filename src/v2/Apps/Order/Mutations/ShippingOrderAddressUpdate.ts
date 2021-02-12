import { graphql } from "react-relay"
import { ShippingOrderAddressUpdateMutation } from "v2/__generated__/ShippingOrderAddressUpdateMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

export const setShippingMutation = (
  commitMutation: CommitMutation,
  variables: ShippingOrderAddressUpdateMutation["variables"]
) => {
  return commitMutation<ShippingOrderAddressUpdateMutation>({
    variables,
    // TODO: Inputs to the mutation might have changed case of the keys!
    mutation: graphql`
      mutation ShippingOrderAddressUpdateMutation(
        $input: CommerceSetShippingInput!
      ) {
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
