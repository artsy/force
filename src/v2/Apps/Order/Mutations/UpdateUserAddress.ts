import { graphql } from "react-relay"
import { UpdateUserAddressMutation } from "v2/__generated__/UpdateUserAddressMutation.graphql"
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
  const useAttriubutes = convertShippingAddressToMutationInput(values)

  const result = await commitMutation<UpdateUserAddressMutation>({
    variables: {
      input: {
        userAddressID: userAddressID,
        attributes: useAttriubutes,
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
