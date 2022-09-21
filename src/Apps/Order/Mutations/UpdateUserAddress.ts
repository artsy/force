import { commitMutation, Environment, graphql } from "react-relay"
import {
  UpdateUserAddressMutation,
  UpdateUserAddressMutation$data,
  UserAddressAttributes,
} from "__generated__/UpdateUserAddressMutation.graphql"

export const updateUserAddress = async (
  environment: Environment,
  userAddressID: string,
  values: UserAddressAttributes,
  closeModal: () => void,
  onSuccess: (address: UpdateUserAddressMutation$data) => void,
  onError: (message: string) => void
) => {
  commitMutation<UpdateUserAddressMutation>(environment, {
    variables: {
      input: {
        userAddressID: userAddressID,
        attributes: values,
      },
    },
    mutation: graphql`
      mutation UpdateUserAddressMutation($input: UpdateUserAddressInput!) {
        updateUserAddress(input: $input) {
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
    onCompleted: (data, e) => {
      const errors = data?.updateUserAddress?.userAddressOrErrors.errors
      if (errors) {
        onError(errors.map(error => error.message).join(", "))
      } else {
        onSuccess(data)
        closeModal()
      }
    },
    onError: e => {
      onError(e.message)
    },
  })
}
