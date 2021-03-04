import { graphql } from "react-relay"
import { DeleteUserAddressMutation } from "v2/__generated__/DeleteUserAddressMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

export const deleteUserAddress = async (
  commitMutation: CommitMutation,
  userAddressID: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  const result = await commitMutation<DeleteUserAddressMutation>({
    variables: {
      input: {
        userAddressID: userAddressID,
      },
    },
    mutation: graphql`
      mutation DeleteUserAddressMutation($input: DeleteUserAddressInput!) {
        deleteUserAddress(input: $input) {
          userAddressOrErrors {
            ... on UserAddress {
              id
              internalID
              name
              addressLine1
              addressLine2
              isDefault
              phoneNumber
              city
              region
              postalCode
              country
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
  const errors = result.deleteUserAddress.userAddressOrErrors.errors
  if (errors) {
    onError(errors.map(error => error.message).join(", "))
  } else {
    onSuccess()
  }
}
