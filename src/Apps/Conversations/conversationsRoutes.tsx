import loadable from "@loadable/component"
import { SIDEBAR_FETCH_PAGE_SIZE } from "Apps/Conversations/components/Sidebar/Utils/getSidebarTotal"
import { RouteProps } from "System/Router/Route"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const ConversationApp = loadable(
  () =>
    import(/* webpackChunkName: "conversationsBundle" */ "./ConversationApp"),
  {
    resolveComponent: component => component.ConversationAppFragmentContainer,
  }
)

export const conversationsRoutes: RouteProps[] = [
  {
    path: "/user/conversations", // Serves only as a redirect route
    layout: "FullBleed",
    render: ({ props }: any) => {
      if (!props) {
        return null
      }

      const initialConversationID = extractNodes<any>(
        props.conversationsConnection
      )[0]?.internalID

      let conversationUrl = initialConversationID
        ? `/user/conversations/${initialConversationID}`
        : "/user/conversations/no-messages"

      if (getENV("IS_MOBILE")) {
        conversationUrl = `${conversationUrl}?showAllConversations=true`
      }

      throw new RedirectException(conversationUrl)
    },
    query: graphql`
      query conversationsRoutes_ConversationQuery {
        conversationsConnection(first: 1) {
          edges {
            node {
              internalID
            }
          }
        }
      }
    `,
  },
  {
    path: "/user/conversations/:conversationId",
    layout: "FullBleed",
    ignoreScrollBehavior: true,
    getComponent: () => ConversationApp,
    prepareVariables: (params, { location }) => {
      return {
        conversationId: params.conversationId,
        first: location.query.sidebarTotal ?? SIDEBAR_FETCH_PAGE_SIZE,
      }
    },
    query: graphql`
      query conversationsRoutes_DetailQuery(
        $conversationId: String!
        $first: Int
      ) {
        viewer {
          ...ConversationApp_viewer @arguments(first: $first)
        }
        conversation(id: $conversationId) {
          ...ConversationApp_conversation
        }
      }
    `,
  },
]
