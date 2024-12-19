import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateUserDefaultAddressMutation } from "__generated__/useUpdateUserDefaultAddressMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateUserDefaultAddress = () => {
  return useMutation<useUpdateUserDefaultAddressMutation>({
    mutation: graphql`
      mutation useUpdateUserDefaultAddressMutation(
        $input: UpdateUserDefaultAddressInput!
      ) {
        updateUserDefaultAddress(input: $input) {
          me {
            ...Shipping_me
          }
          userAddressOrErrors {
            __typename
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
