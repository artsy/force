import { commitMutation, Environment, graphql } from "react-relay"
import {
  DeleteUserAddressMutation,
  DeleteUserAddressMutation$data,
} from "__generated__/DeleteUserAddressMutation.graphql"

export const deleteUserAddress = (
  environment: Environment,
  userAddressID: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  return new Promise<DeleteUserAddressMutation$data>((resolve, reject) => {
    commitMutation<DeleteUserAddressMutation>(environment, {
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
      onError: e => {
        onError(e.message)
      },
      onCompleted: data => {
        const errors = data.deleteUserAddress?.userAddressOrErrors.errors
        if (errors) {
          onError(errors.map(error => error.message).join(", "))
          reject(errors)
        } else {
          onSuccess()
          resolve(data)
        }
      },
    })
  })
}
