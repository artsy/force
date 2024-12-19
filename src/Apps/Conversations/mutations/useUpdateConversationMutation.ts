import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateConversationMutation } from "__generated__/useUpdateConversationMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateConversation = () => {
  return useMutation<useUpdateConversationMutation>({
    mutation: graphql`
      mutation useUpdateConversationMutation(
        $input: UpdateConversationMutationInput!
      ) {
        updateConversation(input: $input) {
          conversation {
            id
            unread
          }
        }
      }
    `,
  })
}
