import { graphql } from "react-relay"
import { UserAddressAttributes } from "v2/__generated__/AddressModalMutation.graphql"
import { ShippingCreateUserAddressMutation } from "v2/__generated__/ShippingCreateUserAddressMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

export const saveUserAddressMutation = (
  commitMutation: CommitMutation,
  address: UserAddressAttributes
) => {
  return commitMutation<ShippingCreateUserAddressMutation>({
    variables: {
      input: {
        attributes: address,
      },
    },
    mutation: graphql`
      mutation ShippingCreateUserAddressMutation(
        $input: CreateUserAddressInput!
      ) {
        createUserAddress(input: $input) {
          userAddressOrErrors {
            ... on UserAddress {
              id
              internalID
            }
            ... on Errors {
              errors {
                code
                message
              }
            }
          }
        }
      }
    `,
  })
}
