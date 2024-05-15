import { createFragmentContainer, graphql } from "react-relay"
import { useMobileLayoutActions } from "Apps/Conversations/hooks/useMobileLayoutActions"
import { ConversationsSidebarPaginationContainer } from "Apps/Conversations/components/Sidebar/ConversationsSidebar"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations/components/Message/ConversationMessages"
import { ConversationReply } from "Apps/Conversations/components/ConversationReply"
import { ConversationDetails } from "Apps/Conversations/components/Details/ConversationDetails"
import { ConversationApp_viewer$data } from "__generated__/ConversationApp_viewer.graphql"
import { ConversationApp_conversation$data } from "__generated__/ConversationApp_conversation.graphql"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"
import { MetaTags } from "Components/MetaTags"
import { ConversationsLayout } from "Apps/Conversations/components/ConversationLayout"
import { ConversationHeader } from "Apps/Conversations/components/ConversationHeader"
import { Media } from "Utils/Responsive"
import { ConversationZeroState } from "Apps/Conversations/components/ConversationZeroState"

interface ConversationRouteProps {
  conversation: ConversationApp_conversation$data
  viewer: ConversationApp_viewer$data
}

const ConversationApp: React.FC<ConversationRouteProps> = ({
  viewer,
  conversation,
}) => {
  const { goToConversation } = useMobileLayoutActions()

  if (!conversation) {
    return <ConversationZeroState />
  }

  return (
    <ConversationsProvider viewer={viewer}>
      <MetaTags title="Inbox | Artsy" />

      <ConversationsLayout
        renderSidebar={() => {
          return <ConversationsSidebarPaginationContainer viewer={viewer} />
        }}
        renderMessages={() => {
          return (
            <>
              <Media lessThan="md">
                <ConversationHeader conversation={conversation} />
              </Media>
              <ConversationMessagesPaginationContainer
                conversation={conversation}
              />
              <ConversationReply conversation={conversation} />
            </>
          )
        }}
        renderDetails={() => {
          return (
            <ConversationDetails
              conversation={conversation}
              onClose={goToConversation}
            />
          )
        }}
      />
    </ConversationsProvider>
  )
}

export const ConversationAppFragmentContainer = createFragmentContainer(
  ConversationApp,
  {
    viewer: graphql`
      fragment ConversationApp_viewer on Viewer
        @argumentDefinitions(first: { type: "Int", defaultValue: 10 }) {
        ...ConversationsSidebar_viewer @arguments(first: $first)
        ...ConversationsContext_viewer
      }
    `,
    conversation: graphql`
      fragment ConversationApp_conversation on Conversation {
        ...ConversationHeader_conversation
        ...ConversationDetails_conversation
        ...ConversationReply_conversation
        ...ConversationMessages_conversation
      }
    `,
  }
)
