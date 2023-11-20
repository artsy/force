import { createFragmentContainer, graphql } from "react-relay"
import { useMobileLayoutActions } from "Apps/Conversations2/hooks/useMobileLayoutActions"
import { ConversationsSidebar } from "Apps/Conversations2/components/Sidebar/ConversationsSidebar"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations2/components/Message/ConversationMessages"
import { ConversationReply } from "Apps/Conversations2/components/ConversationReply"
import { ConversationDetails } from "Apps/Conversations2/components/Details/ConversationDetails"
import { Conversation2App_viewer$data } from "__generated__/Conversation2App_viewer.graphql"
import { Conversation2App_conversation$data } from "__generated__/Conversation2App_conversation.graphql"
import { Fragment, Suspense } from "react"
import { ConversationsProvider } from "Apps/Conversations2/ConversationsContext"
import { MetaTags } from "Components/MetaTags"
import { ConversationsLayout } from "Apps/Conversations2/components/ConversationLayout"

interface Conversation2RouteProps {
  conversation: Conversation2App_conversation$data
  viewer: Conversation2App_viewer$data
}

const Conversation2App: React.FC<Conversation2RouteProps> = ({
  viewer,
  conversation,
}) => {
  const { goToConversation } = useMobileLayoutActions()

  return (
    <ConversationsProvider>
      <MetaTags title="Inbox | Artsy" />

      <ConversationsLayout
        renderSidebar={() => {
          return <ConversationsSidebar viewer={viewer} />
        }}
        renderMessages={() => {
          return (
            <>
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

export const Conversation2AppFragmentContainer = createFragmentContainer(
  Conversation2App,
  {
    viewer: graphql`
      fragment Conversation2App_viewer on Viewer
        @argumentDefinitions(first: { type: "Int", defaultValue: 10 }) {
        ...ConversationsSidebar_viewer @arguments(first: $first)
      }
    `,
    conversation: graphql`
      fragment Conversation2App_conversation on Conversation {
        ...ConversationHeader_conversation
        ...ConversationDetails_conversation
        ...ConversationReply_conversation
        ...ConversationMessages_conversation
      }
    `,
  }
)

const ClientOnlySuspense = (typeof window !== "undefined"
  ? Suspense
  : Fragment) as typeof Suspense
