import { useMutation } from "Utils/Hooks/useMutation"
import type { useAddAddressMutation } from "__generated__/useAddAddressMutation.graphql"
import { graphql } from "react-relay"

export const useAddAddress = () => {
  return useMutation<useAddAddressMutation>({
    mutation: graphql`
      mutation useAddAddressMutation($input: CreateUserAddressInput!) {
        createUserAddress(input: $input) {
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
