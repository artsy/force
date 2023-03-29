import { Flex } from "@artsy/palette"
import { TOP_NAV_HEIGHT } from "components/GlobalNav"
import { Layout } from "components/Layout"
import { Resizer } from "components/Resizer"
import { ConversationsSidebarSkeleton } from "pages/conversations/components/Sidebar/ConversationsSidebarSkeleton"
import { useMobileLayoutActions } from "pages/conversations/hooks/useMobileLayoutActions"
import { ConversationHeader } from "pages/conversations/[conversationId]/Components/ConversationHeader"
import { ConversationMessages } from "pages/conversations/[conversationId]/Components/ConversationMessages"
import { ConversationReply } from "pages/conversations/[conversationId]/Components/ConversationReply"
import { Suspense } from "react"
import { Media } from "utils/responsive"
import { ConversationDetails_viewer$key } from "__generated__/ConversationDetails_viewer.graphql"
import { ConversationHeader_viewer$key } from "__generated__/ConversationHeader_viewer.graphql"
import { ConversationMessages_conversation$key } from "__generated__/ConversationMessages_conversation.graphql"
import { ConversationReply_conversation$key } from "__generated__/ConversationReply_conversation.graphql"
import { ConversationsSidebar_viewer$key } from "__generated__/ConversationsSidebar_viewer.graphql"
import { ConversationDetails } from "./Details/ConversationDetails"
import { ConversationsSidebar } from "./Sidebar/ConversationsSidebar"

const COLUMN_HEIGHT = `calc(100vh - ${TOP_NAV_HEIGHT}px)`
const MOBILE_HEIGHT = `calc(100dvh - ${TOP_NAV_HEIGHT}px)`

interface ConversationsLayoutProps {
  viewer: ConversationHeader_viewer$key & ConversationDetails_viewer$key
  viewerConversationsPagination: ConversationsSidebar_viewer$key
  conversation: ConversationReply_conversation$key
  conversationMessagesPagination: ConversationMessages_conversation$key
}

export const ConversationsLayout: React.FC<ConversationsLayoutProps> = ({
  viewer,
  viewerConversationsPagination,
  conversation,
  conversationMessagesPagination,
}) => {
  const { currentColumn, goToDetails, goToSidebar, goToConversation } =
    useMobileLayoutActions()

  return (
    <Layout>
      {/* Desktop view */}
      <Media greaterThan="sm">
        <Flex display={["none", "flex"]}>
          <Resizer split="vertical" minSize={200} defaultSizes={[1, 2, 1]}>
            <Flex
              flexGrow={[0, 1]}
              position="sticky"
              top={0}
              overflowY="auto"
              height={COLUMN_HEIGHT}
              display={["none", "block"]}
              borderRight="1px solid"
              borderRightColor="black15"
            >
              <Suspense fallback={<ConversationsSidebarSkeleton />}>
                <ConversationsSidebar viewer={viewerConversationsPagination} />
              </Suspense>
            </Flex>

            <Flex
              flexGrow={1}
              position="sticky"
              top={0}
              overflowY="auto"
              height={COLUMN_HEIGHT}
            >
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                flexGrow={1}
                width="100%"
              >
                <ConversationHeader viewer={viewer} />

                <ConversationMessages
                  conversation={conversationMessagesPagination}
                />

                <ConversationReply conversation={conversation} />
              </Flex>
            </Flex>

            <Flex
              flexGrow={1}
              position="sticky"
              top={0}
              overflowY="auto"
              height={COLUMN_HEIGHT}
              display={["none", "block"]}
              borderLeft="1px solid"
              borderLeftColor="black15"
              p={2}
              pb={6}
            >
              <ConversationDetails viewer={viewer} />
            </Flex>
          </Resizer>
        </Flex>
      </Media>

      {/* Mobile View */}
      <Media lessThan="md">
        <Flex
          display={currentColumn === "sidebar" ? "flex" : "none"}
          height={MOBILE_HEIGHT}
          flexDirection="column"
        >
          <Suspense fallback={<ConversationsSidebarSkeleton />}>
            <ConversationsSidebar viewer={viewerConversationsPagination} />
          </Suspense>
        </Flex>

        <Flex
          display={currentColumn === "conversation" ? "flex" : "none"}
          height={MOBILE_HEIGHT}
          flexGrow={1}
          position="sticky"
          justifyContent="space-between"
          flexDirection="column"
          top={0}
          overflowY="auto"
        >
          <ConversationHeader
            viewer={viewer}
            onGoToConversations={goToSidebar}
            onGoToDetails={goToDetails}
          />

          <ConversationMessages conversation={conversationMessagesPagination} />

          <ConversationReply conversation={conversation} />
        </Flex>

        <Flex
          display={currentColumn === "detail" ? "flex" : "none"}
          height={MOBILE_HEIGHT}
          flexGrow={1}
          position="sticky"
          top={0}
          overflowY="auto"
          p={2}
          pb={6}
        >
          <ConversationDetails viewer={viewer} onClose={goToConversation} />
        </Flex>
      </Media>
    </Layout>
  )
}
