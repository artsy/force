import { graphql, useMutation } from "react-relay"
import { useDeleteConversationMutation } from "__generated__/useDeleteConversationMutation.graphql"

export const useDeleteConversation = () => {
  return useMutation<useDeleteConversationMutation>(graphql`
    mutation useDeleteConversationMutation(
      $input: DeleteConversationMutationInput!
    ) {
      deleteConversation(input: $input) {
        conversationOrError {
          __typename
          ... on DeleteConversationSuccess {
            conversation {
              deletedAt
            }
          }
          ... on DeleteConversationFailure {
            mutationError {
              message
            }
          }
        }
      }
    }
  `)
}
