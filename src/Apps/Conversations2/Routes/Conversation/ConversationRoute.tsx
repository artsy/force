import { ConversationsLayout } from "../components/ConversationsLayout"
import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay/fetchRelayData"
import { graphql, useLazyLoadQuery } from "react-relay"
import { getUserFromSession } from "system/user"
import { ConversationIdConversationMessagesQuery } from "__generated__/ConversationIdConversationMessagesQuery.graphql"
import { ConversationIdConversationsQuery } from "__generated__/ConversationIdConversationsQuery.graphql"
import { ConversationDetails_viewer$key } from "__generated__/ConversationDetails_viewer.graphql"
import { ConversationHeader_viewer$key } from "__generated__/ConversationHeader_viewer.graphql"
import { ConversationReply_conversation$key } from "__generated__/ConversationReply_conversation.graphql"

interface ConversationMessagesProps {
  conversation: ConversationReply_conversation$key
  viewer: ConversationHeader_viewer$key & ConversationDetails_viewer$key
  conversationId: string
  partnerId: string
  toBeReplied?: boolean
  hasReply?: boolean
}

const ConversationMessagesPage: React.FC<ConversationMessagesProps> = ({
  conversation,
  conversationId,
  viewer,
  partnerId,
  toBeReplied,
  hasReply,
}) => {
  // We split the pagination query from ConversationMessages_conversation
  // because it was conflicting when switching between conversations
  // and with the pagination of the conversations list
  const messagesPaginationData =
    useLazyLoadQuery<ConversationIdConversationMessagesQuery>(
      graphql`
        query ConversationIdConversationMessagesQuery(
          $conversationId: String!
        ) {
          conversation(id: $conversationId) @required(action: NONE) {
            ...ConversationMessages_conversation
          }
        }
      `,
      { conversationId }
    )

  // The same here in regards the pagination query, moved it to the client side
  // fo fix the issue when switching between conversations
  const conversationsPaginationData =
    useLazyLoadQuery<ConversationIdConversationsQuery>(
      graphql`
        query ConversationIdConversationsQuery(
          $partnerId: String!
          $sellerId: ID!
          $toBeReplied: Boolean
          $hasReply: Boolean
        ) {
          viewer @required(action: NONE) {
            ...ConversationsSidebar_viewer
              @arguments(
                partnerId: $partnerId
                sellerId: $sellerId
                toBeReplied: $toBeReplied
                hasReply: $hasReply
              )
          }
        }
      `,
      { partnerId, sellerId: partnerId, toBeReplied, hasReply }
    )

  return (
    <ConversationsLayout
      viewer={viewer}
      conversation={conversation}
      viewerConversationsPagination={conversationsPaginationData?.viewer!}
      conversationMessagesPagination={messagesPaginationData?.conversation!}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserFromSession(ctx.req, ctx.res)
  const conversationId = ctx.query.conversationId
  const partnerId = user?.currentPartner?._id
  const conversationsFilter: {
    toBeReplied?: boolean
    hasReply?: boolean
  } = {}

  switch (ctx.query.conversationsFilter) {
    case "new_inquiries":
      conversationsFilter.toBeReplied = true
      break
    case "replied":
      conversationsFilter.hasReply = true
      break
  }

  const props = await fetchRelayData({
    query: graphql`
      query ConversationIdQuery($conversationId: String!, $sellerId: ID!) {
        viewer {
          ...ConversationHeader_viewer
            @arguments(conversationId: $conversationId, sellerId: $sellerId)
          ...ConversationDetails_viewer
            @arguments(conversationId: $conversationId, sellerId: $sellerId)
        }

        conversation(id: $conversationId) @required(action: NONE) {
          ...ConversationReply_conversation
        }
      }
    `,
    variables: {
      conversationId,
      sellerId: partnerId,
    },
    ctx,
  })

  return {
    props: {
      ...props,
      conversationId,
      partnerId,
      ...conversationsFilter,
    },
  }
}

export default ConversationMessagesPage
