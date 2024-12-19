import { useMutation } from "Utils/Hooks/useMutation"
import type { useDeleteAddressMutation } from "__generated__/useDeleteAddressMutation.graphql"
import { graphql } from "react-relay"

export const useDeleteAddress = () => {
  return useMutation<useDeleteAddressMutation>({
    mutation: graphql`
      mutation useDeleteAddressMutation($input: DeleteUserAddressInput!) {
        deleteUserAddress(input: $input) {
          me {
            ...SettingsShippingAddresses_me
          }
          userAddressOrErrors {
            ... on UserAddress {
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
