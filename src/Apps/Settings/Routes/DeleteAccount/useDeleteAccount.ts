import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useDeleteAccountMutation } from "__generated__/useDeleteAccountMutation.graphql"

export const useDeleteAccount = () => {
  return useMutation<useDeleteAccountMutation>({
    mutation: graphql`
      mutation useDeleteAccountMutation($input: DeleteAccountInput!) {
        deleteMyAccountMutation(input: $input) {
          userAccountOrError {
            ... on AccountMutationSuccess {
              success
            }
            ... on AccountMutationFailure {
              mutationError {
                type
                message
                detail
              }
            }
          }
        }
      }
    `,
  })
}
