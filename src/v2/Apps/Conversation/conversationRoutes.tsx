import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"

export const conversationRoutes: AppRouteConfig[] = [
  {
    theme: "v3",
    path: "/user/conversations",
    displayFullPage: true,
    hideFooter: true,
    getComponent: () =>
      loadable(
        () =>
          import(
            /* webpackChunkName: "conversationBundle" */ "./ConversationApp"
          ),
        {
          resolveComponent: component =>
            component.ConversationAppFragmentContainer,
        }
      ),
    query: graphql`
      query conversationRoutes_ConversationQuery {
        me {
          ...ConversationApp_me
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 30,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
  {
    theme: "v3",
    path: "/user/conversations/:conversationID",
    displayFullPage: true,
    hideFooter: true,
    ignoreScrollBehavior: true,
    Component: loadable(
      () =>
        import(
          /* webpackChunkName: "conversationBundle" */ "./Routes/Conversation"
        ),
      {
        resolveComponent: component =>
          component.ConversationPaginationContainer,
      }
    ),
    prepareVariables: (params, _props) => {
      return {
        conversationID: params.conversationID,
      }
    },
    query: graphql`
      query conversationRoutes_DetailQuery($conversationID: String!) {
        me {
          ...Conversation_me @arguments(conversationID: $conversationID)
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
