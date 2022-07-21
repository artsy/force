import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteAddressMutation } from "__generated__/useDeleteAddressMutation.graphql"

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
