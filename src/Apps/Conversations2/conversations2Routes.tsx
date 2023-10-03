import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import { RedirectException } from "found"
import { graphql } from "react-relay"

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
    path: "/user/conversations2", // Serves only as a redirect route
    layout: "Default",
    render: ({ props }) => {
      if (!props) {
        return null
      }

      const initialConversationID = extractNodes<any>(
        // @ts-ignore
        props.conversationsConnection
      )[0]?.internalID

      let conversationUrl = `/user/conversations2/${initialConversationID}`

      if (getENV("IS_MOBILE")) {
        conversationUrl = `${conversationUrl}?showAllConversations=true`
      }

      throw new RedirectException(conversationUrl)
    },
    query: graphql`
      query conversations2Routes_ConversationQuery {
        conversationsConnection(first: 1) {
          edges {
            node {
              internalID
            }
          }
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/user/conversations2/:conversationId",
    layout: "Default",
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
          ...Conversation2Route_viewer
            @arguments(toBeReplied: $toBeReplied, hasReply: $hasReply)
        }
        conversation(id: $conversationId) @required(action: NONE) {
          ...Conversation2Route_conversation
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
