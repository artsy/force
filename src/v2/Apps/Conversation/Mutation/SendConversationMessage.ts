import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import { SendConversationMessageMutation } from "v2/__generated__/SendConversationMessageMutation.graphql"
import {
  commitMutation,
  ConnectionHandler,
  Environment,
  graphql,
  MutationConfig,
  RecordSourceSelectorProxy,
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
      "Messages_messages"
    )
    ConnectionHandler.insertEdgeAfter(connection, newMessageEdge)
  }
  return commitMutation<SendConversationMessageMutation>(environment, {
    onError,
    onCompleted,
    optimisticUpdater: storeUpdater,
    updater: storeUpdater,
    variables: {
      input: {
        id: conversation.internalID,
        from: conversation.from.email,
        bodyText: text,
        // Reply to the last message
        replyToMessageID: conversation.lastMessageID,
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
        connectionName: "messages",
        edgeName: "messageEdge",
        rangeBehaviors: {
          "": "append",
        },
        connectionInfo: [
          {
            key: "Messages_messages",
            rangeBehavior: "append",
          },
        ],
      },
    ],

    optimisticResponse: {
      sendConversationMessage: {
        messageEdge: {
          node: {
            id: null,
            internalID: null,
            impulseID: null,
            body: text,
            from: {
              email: conversation.from.email,
              name: null,
            },
            isFromUser: true,
            createdAt: null, // Intentionally left blank so Message can recognize this as an optimistic response.
            attachments: [],
          } as any,
        },
      },
    },
  })
}
