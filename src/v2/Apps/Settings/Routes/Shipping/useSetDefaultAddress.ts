import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useSetDefaultAddressMutation } from "v2/__generated__/useSetDefaultAddressMutation.graphql"

export const useSetDefaultAddress = () => {
  return useMutation<useSetDefaultAddressMutation>({
    mutation: graphql`
      mutation useSetDefaultAddressMutation(
        $input: UpdateUserDefaultAddressInput!
      ) {
        updateUserDefaultAddress(input: $input) {
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
