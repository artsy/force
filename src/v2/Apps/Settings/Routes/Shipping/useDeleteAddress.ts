import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteAddressMutation } from "v2/__generated__/useDeleteAddressMutation.graphql"

export const useDeleteAddress = () => {
  return useMutation<useDeleteAddressMutation>({
    mutation: graphql`
      mutation useDeleteAddressMutation($input: DeleteUserAddressInput!) {
        deleteUserAddress(input: $input) {
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
