import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import { UpdateConversationMutation } from "v2/__generated__/UpdateConversationMutation.graphql"
import { Environment, commitMutation, graphql } from "relay-runtime"

export const UpdateConversation = (
  environment: Environment,
  conversation: Conversation_conversation
) => {
  return commitMutation<UpdateConversationMutation>(environment, {
    variables: {
      input: {
        // @ts-expect-error STRICT_NULL_CHECK
        conversationId: conversation.internalID,
        // @ts-expect-error STRICT_NULL_CHECK
        fromLastViewedMessageId: conversation.lastMessageID,
      },
    },
    mutation: graphql`
      mutation UpdateConversationMutation(
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
    optimisticResponse: {
      updateConversation: {
        conversation: {
          // @ts-expect-error STRICT_NULL_CHECK
          id: conversation.internalID,
          unread: false,
        },
      },
    },
    updater: (store, data) => {
      const conversationProxy = store.get(conversation.id)
      // @ts-expect-error STRICT_NULL_CHECK
      conversationProxy.setValue(false, "unread")
    },
  })
}
