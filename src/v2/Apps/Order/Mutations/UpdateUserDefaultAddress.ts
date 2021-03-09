import { graphql } from "react-relay"
import { UpdateUserDefaultAddressMutation } from "v2/__generated__/UpdateUserDefaultAddressMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

export const updateUserDefaultAddress = async (
  commitMutation: CommitMutation,
  userAddressID: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  const result = await commitMutation<UpdateUserDefaultAddressMutation>({
    variables: {
      input: {
        userAddressID: userAddressID,
      },
    },
    mutation: graphql`
      mutation UpdateUserDefaultAddressMutation(
        $input: UpdateUserDefaultAddressInput!
      ) {
        updateUserDefaultAddress(input: $input) {
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
  const errors = result.updateUserDefaultAddress.userAddressOrErrors.errors
  if (errors) {
    onError(errors.map(error => error.message).join(", "))
  } else {
    onSuccess()
  }
}
