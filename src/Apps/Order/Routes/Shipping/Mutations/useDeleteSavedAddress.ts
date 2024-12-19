import { useMutation } from "Utils/Hooks/useMutation"
import type { useDeleteSavedAddressMutation } from "__generated__/useDeleteSavedAddressMutation.graphql"
import { graphql } from "react-relay"

export const useDeleteSavedAddress = () => {
  return useMutation<useDeleteSavedAddressMutation>({
    mutation: graphql`
      mutation useDeleteSavedAddressMutation($input: DeleteUserAddressInput!) {
        deleteUserAddress(input: $input) {
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
