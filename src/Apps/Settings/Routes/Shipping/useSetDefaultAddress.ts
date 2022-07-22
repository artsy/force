import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useSetDefaultAddressMutation } from "__generated__/useSetDefaultAddressMutation.graphql"

export const useSetDefaultAddress = () => {
  return useMutation<useSetDefaultAddressMutation>({
    mutation: graphql`
      mutation useSetDefaultAddressMutation(
        $input: UpdateUserDefaultAddressInput!
      ) {
        updateUserDefaultAddress(input: $input) {
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
