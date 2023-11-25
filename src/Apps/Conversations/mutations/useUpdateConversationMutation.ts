import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateConversationMutation } from "__generated__/useUpdateConversationMutation.graphql"

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
