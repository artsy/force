import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteSavedAddressMutation } from "__generated__/useDeleteSavedAddressMutation.graphql"

export const useDeleteSavedAddress = () => {
  return useMutation<useDeleteSavedAddressMutation>({
    mutation: graphql`
      mutation useDeleteSavedAddressMutation($input: DeleteUserAddressInput!) {
        deleteUserAddress(input: $input) {
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
