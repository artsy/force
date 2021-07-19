import { commitMutation, Environment, graphql } from "react-relay"
import { Address } from "v2/Components/AddressForm"
import {
  UpdateUserAddressMutation,
  UserAddressAttributes,
} from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { convertShippingAddressForExchange } from "../Utils/shippingUtils"

export const updateUserAddress = async (
  environment: Environment,
  userAddressID: string,
  values: UserAddressAttributes,
  closeModal: () => void,
  onSuccess: (address: Address) => void,
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
      // @ts-expect-error STRICT_NULL_CHECK
      const errors = data.updateUserAddress.userAddressOrErrors.errors
      if (errors) {
        onError(errors.map(error => error.message).join(", "))
      } else {
        const address = convertShippingAddressForExchange(
          // @ts-expect-error STRICT_NULL_CHECK
          data.updateUserAddress.userAddressOrErrors
        )
        onSuccess(address)
        closeModal()
      }
    },
    onError: e => {
      onError(e.message)
    },
  })
}
