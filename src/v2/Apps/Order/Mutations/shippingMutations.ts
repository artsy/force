import { graphql } from "react-relay"
import { AddressModalMutation } from "v2/__generated__/AddressModalMutation.graphql"
import {
  UserAddressAttributes,
  ShippingCreateUserAddressMutation,
} from "v2/__generated__/ShippingCreateUserAddressMutation.graphql"
import { ShippingOrderAddressUpdateMutation } from "v2/__generated__/ShippingOrderAddressUpdateMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"
import {
  convertShippingAddressToMutationInput,
  convertShippingAddressForExchange,
} from "../Utils/shippingAddressUtils"

export const setShippingMutation = (
  commitMutation: CommitMutation,
  variables: ShippingOrderAddressUpdateMutation["variables"]
) => {
  return commitMutation<ShippingOrderAddressUpdateMutation>({
    variables,
    // TODO: Inputs to the mutation might have changed case of the keys!
    mutation: graphql`
      mutation ShippingOrderAddressUpdateMutation(
        $input: CommerceSetShippingInput!
      ) {
        commerceSetShipping(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              __typename
              order {
                internalID
                state
                requestedFulfillment {
                  __typename
                  ... on CommerceShip {
                    name
                    addressLine1
                    addressLine2
                    city
                    region
                    country
                    postalCode
                    phoneNumber
                  }
                }
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}

export const saveUserAddressMutation = (
  commitMutation: CommitMutation,
  address: UserAddressAttributes
) => {
  return commitMutation<ShippingCreateUserAddressMutation>({
    variables: {
      input: {
        attributes: address,
      },
    },
    mutation: graphql`
      mutation ShippingCreateUserAddressMutation(
        $input: CreateUserAddressInput!
      ) {
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
