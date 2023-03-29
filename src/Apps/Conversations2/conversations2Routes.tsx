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
    resolveComponent: component =>
      component.Conversation2RouteFragmentContainer,
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
        sellerId: "commerce-test-partner",
        partnerId: "commerce-test-partner",
        toBeReplied: conversationsFilter.toBeReplied,
        hasReply: conversationsFilter.hasReply,
      }
    },
    query: graphql`
      query conversations2Routes_DetailQuery(
        $conversationId: String!
        $sellerId: ID!
        $partnerId: String!
        $toBeReplied: Boolean
        $hasReply: Boolean
      ) {
        viewer {
          ...Conversation2Route_viewer
            @arguments(
              toBeReplied: $toBeReplied
              hasReply: $hasReply
              sellerId: $sellerId
              partnerId: $partnerId
            )
        }
        conversation(id: $conversationId) @required(action: NONE) {
          ...Conversation2Route_conversation @arguments(sellerId: $sellerId)
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
