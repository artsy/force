import { useMutation } from "Utils/Hooks/useMutation"
import type { useEditAddressMutation } from "__generated__/useEditAddressMutation.graphql"
import { graphql } from "react-relay"

export const useEditAddress = () => {
  return useMutation<useEditAddressMutation>({
    mutation: graphql`
      mutation useEditAddressMutation($input: UpdateUserAddressInput!) {
        updateUserAddress(input: $input) {
          me {
            ...SettingsShippingAddresses_me
          }
          userAddressOrErrors {
            ... on UserAddress {
              internalID
              ...SettingsShippingAddress_address
            }
            ... on Errors {
              errors {
                message
              }
            }
          }
        }
      }
    `,
  })
}
