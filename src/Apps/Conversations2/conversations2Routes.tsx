import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const Conversation2App = loadable(
  () =>
    import(/* webpackChunkName: "conversations2Bundle" */ "./Conversation2App"),
  {
    resolveComponent: component => component.Conversation2AppFragmentContainer,
  }
)

export const conversations2Routes: AppRouteConfig[] = [
  {
    path: "/user/conversations2", // Serves only as a redirect route
    layout: "FullBleed",
    render: ({ props }: any) => {
      if (!props) {
        return null
      }

      const initialConversationID = extractNodes<any>(
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
    layout: "FullBleed",
    ignoreScrollBehavior: true,
    getComponent: () => Conversation2App,

    query: graphql`
      query conversations2Routes_DetailQuery($conversationId: String!) {
        viewer {
          ...Conversation2App_viewer
        }
        conversation(id: $conversationId) @required(action: NONE) {
          ...Conversation2App_conversation
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
