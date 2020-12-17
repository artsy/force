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
    const newMessageEdge = mutationPayload.getLinkedRecord("messageEdge")
    const conversationStore = store.get(conversation.id)
    const connection = ConnectionHandler.getConnection(
      conversationStore,
      "Messages_messagesConnection"
    )
    ConnectionHandler.insertEdgeBefore(connection, newMessageEdge)
  }
  return commitMutation<SendConversationMessageMutation>(environment, {
    configs: [
      {
        connectionName: "messagesConnection",
        edgeName: "messageEdge",
        connectionInfo: [
          {
            key: "Messages_messagesConnection",
            rangeBehavior: "append",
          },
        ],
        parentName: "conversation",
        parentID: "id",
        type: "RANGE_ADD",
        rangeBehaviors: {
          "": "append",
        },
      },
    ],
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
    onCompleted,
    onError,
    updater: storeUpdater,
    variables: {
      input: {
        bodyText: text,
        from: conversation.from.email,
        id: conversation.internalID,
        // Reply to the last message
        replyToMessageID: conversation.lastMessageID,
      },
    },
  })
}
