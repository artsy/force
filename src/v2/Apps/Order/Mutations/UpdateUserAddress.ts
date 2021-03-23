import { commitMutation, Environment, graphql } from "react-relay"
import { UpdateUserAddressMutation } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import {
  convertShippingAddressToMutationInput,
  convertShippingAddressForExchange,
} from "../Utils/shippingAddressUtils"

export const updateUserAddress = async (
  environment: Environment,
  userAddressID: string,
  values: any,
  closeModal: () => void,
  onSuccess: (address) => void,
  onError: (message: string) => void
) => {
  const useAttributes = convertShippingAddressToMutationInput(values)

  commitMutation<UpdateUserAddressMutation>(environment, {
    variables: {
      input: {
        userAddressID: userAddressID,
        attributes: useAttributes,
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
      const errors = data.updateUserAddress.userAddressOrErrors.errors
      if (errors) {
        onError(errors.map(error => error.message).join(", "))
      } else {
        const address = convertShippingAddressForExchange(
          data.updateUserAddress.userAddressOrErrors
        )
        onSuccess(address)
      }
      closeModal()
    },
    onError: e => {
      onError(e.message)
    },
  })
}
