import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import { SendConversationMessageMutation } from "v2/__generated__/SendConversationMessageMutation.graphql"
import {
  ConnectionHandler,
  Environment,
  MutationConfig,
  RecordSourceSelectorProxy,
  commitMutation,
  graphql,
} from "relay-runtime"

export const SendConversationMessage = (
  environment: Environment,
  conversation: Conversation_conversation,
  text: string,
  onCompleted: MutationConfig<any>["onCompleted"],
  onError: MutationConfig<any>["onError"]
) => {
  const storeUpdater = (store: RecordSourceSelectorProxy) => {
    const mutationPayload = store.getRootField("sendConversationMessage")
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const newMessageEdge = mutationPayload.getLinkedRecord("messageEdge")
    const conversationStore = store.get(conversation.id)
    const connection = ConnectionHandler.getConnection(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      conversationStore,
      "Messages_messagesConnection"
    )
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    ConnectionHandler.insertEdgeBefore(connection, newMessageEdge)
  }
  return commitMutation<SendConversationMessageMutation>(environment, {
    onError,
    onCompleted,
    updater: storeUpdater,
    variables: {
      input: {
        id: conversation?.internalID ?? "",
        from: conversation.from.email,
        bodyText: text,
        // Reply to the last message
        replyToMessageID: conversation?.lastMessageID ?? "",
      },
    },
    mutation: graphql`
      mutation SendConversationMessageMutation(
        $input: SendConversationMessageMutationInput!
      ) {
        sendConversationMessage(input: $input) {
          messageEdge {
            node {
              impulseID
              isFromUser
              body
              id
              internalID
              ...Message_message
            }
          }
        }
      }
    `,
    configs: [
      {
        type: "RANGE_ADD",
        parentName: "conversation",
        parentID: "id",
        connectionName: "messagesConnection",
        edgeName: "messageEdge",
        rangeBehaviors: {
          "": "append",
        },
        connectionInfo: [
          {
            key: "Messages_messagesConnection",
            rangeBehavior: "append",
          },
        ],
      },
    ],
  })
}
