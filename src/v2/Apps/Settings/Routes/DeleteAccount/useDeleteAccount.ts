import { graphql } from "react-relay"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { useDeleteAccountMutation } from "v2/__generated__/useDeleteAccountMutation.graphql"

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
