import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { graphql } from "react-relay"

const Conversations2App = loadable(
  () =>
    import(
      /* webpackChunkName: "conversations2Bundle" */ "./Conversations2App"
    ),
  {
    resolveComponent: component => component.Conversations2AppFragmentContainer,
  }
)

const Conversation2Route = loadable(
  () =>
    import(
      /* webpackChunkName: "conversations2Bundle" */ "./Routes/Conversation/Conversation2Route"
    ),
  {
    resolveComponent: component => component.Conversation2Route,
  }
)

export const conversations2Routes: AppRouteConfig[] = [
  {
    path: "/user/conversations2",
    layout: "NavOnly",
    getComponent: () => Conversations2App,
    query: graphql`
      query conversations2Routes_ConversationQuery {
        viewer {
          ...Conversations2App_viewer
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/user/conversations2/:conversationId",
    layout: "NavOnly",
    ignoreScrollBehavior: true,
    getComponent: () => Conversation2Route,
    prepareVariables: (params, { location }) => {
      const conversationsFilter: {
        toBeReplied?: boolean
        hasReply?: boolean
      } = {}

      switch (location.query.conversationsFilter) {
        case "new_inquiries":
          conversationsFilter.toBeReplied = true
          break
        case "replied":
          conversationsFilter.hasReply = true
          break
      }

      return {
        conversationId: params.conversationId,
        toBeReplied: conversationsFilter.toBeReplied,
        hasReply: conversationsFilter.hasReply,
      }
    },
    query: graphql`
      query conversations2Routes_DetailQuery(
        $conversationId: String!
        $toBeReplied: Boolean
        $hasReply: Boolean
      ) {
        viewer {
          ...ConversationHeader_viewer
            @arguments(conversationId: $conversationId)
          ...ConversationDetails_viewer
            @arguments(conversationId: $conversationId)
          ...ConversationsSidebar_viewer
            @arguments(
              # partnerId: $partnerId
              # sellerId: $sellerId
              toBeReplied: $toBeReplied
              hasReply: $hasReply
            )
        }

        conversation(id: $conversationId) @required(action: NONE) {
          ...ConversationMessages_conversation
          ...ConversationReply_conversation
        }
        # me {
        #   ...Conversation_me @arguments(conversationID: $conversationID)
        # }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
