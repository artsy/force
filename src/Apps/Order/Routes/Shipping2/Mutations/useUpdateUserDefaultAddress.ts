import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useUpdateUserDefaultAddressMutation } from "__generated__/useUpdateUserDefaultAddressMutation.graphql"

export const useUpdateUserDefaultAddress = () => {
  return useMutation<useUpdateUserDefaultAddressMutation>({
    mutation: graphql`
      mutation useUpdateUserDefaultAddressMutation(
        $input: UpdateUserDefaultAddressInput!
      ) {
        updateUserDefaultAddress(input: $input) {
          me {
            ...Shipping2_me
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
