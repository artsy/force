import { useMutation } from "Utils/Hooks/useMutation"
import type { useDeleteAccountMutation } from "__generated__/useDeleteAccountMutation.graphql"
import { graphql } from "react-relay"

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
