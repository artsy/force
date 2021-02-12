import { graphql } from "react-relay"
import { AddressModalMutation } from "v2/__generated__/AddressModalMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"
import {
  convertShippingAddressToMutationInput,
  convertShippingAddressForExchange,
} from "../Utils/shippingAddressUtils"

export const updateUserAddress = async (
  commitMutation: CommitMutation,
  userAddressID: string,
  values: any,
  closeModal: () => void,
  onSuccess: (address) => void,
  onError: (message: string) => void
) => {
  const useArtrubutes = convertShippingAddressToMutationInput(values)

  const result = await commitMutation<AddressModalMutation>({
    variables: {
      input: {
        userAddressID: userAddressID,
        attributes: useArtrubutes,
      },
    },
    mutation: graphql`
      mutation AddressModalMutation($input: UpdateUserAddressInput!) {
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
  })
  const errors = result.updateUserAddress.userAddressOrErrors.errors
  if (errors) {
    onError(errors.map(error => error.message).join(", "))
  } else {
    const address = convertShippingAddressForExchange(
      result.updateUserAddress.userAddressOrErrors
    )
    onSuccess(address)
  }
  closeModal()
}
