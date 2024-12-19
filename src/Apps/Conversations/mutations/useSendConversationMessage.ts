import type { useSendConversationMessageMutation } from "__generated__/useSendConversationMessageMutation.graphql"
import { graphql, useMutation } from "react-relay"

export const useSendConversationMessage = () => {
  return useMutation<useSendConversationMessageMutation>(graphql`
    mutation useSendConversationMessageMutation(
      $input: SendConversationMessageMutationInput!
    ) {
      sendConversationMessage(input: $input) {
        conversation {
          ...ConversationMessages_conversation
          lastMessageID
        }
      }
    }
  `)
}
