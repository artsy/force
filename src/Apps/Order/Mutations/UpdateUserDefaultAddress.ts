import { commitMutation, Environment, graphql } from "react-relay"
import { UpdateUserDefaultAddressMutation } from "__generated__/UpdateUserDefaultAddressMutation.graphql"

export const updateUserDefaultAddress = async (
  environment: Environment,
  userAddressID: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  commitMutation<UpdateUserDefaultAddressMutation>(environment, {
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
    onError: e => {
      onError(e.message)
    },
    onCompleted: (data, e) => {
      const errors = data.updateUserDefaultAddress?.userAddressOrErrors.errors
      if (errors) {
        onError(errors.map(error => error.message).join(", "))
      } else {
        onSuccess()
      }
    },
  })
}
