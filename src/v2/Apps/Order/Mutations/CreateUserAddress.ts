import { graphql } from "react-relay"
import { UserAddressAttributes } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation } from "v2/__generated__/CreateUserAddressMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

export const createUserAddress = (
  commitMutation: CommitMutation,
  address: UserAddressAttributes
) => {
  return commitMutation<CreateUserAddressMutation>({
    variables: {
      input: {
        attributes: address,
      },
    },
    mutation: graphql`
      mutation CreateUserAddressMutation($input: CreateUserAddressInput!) {
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
