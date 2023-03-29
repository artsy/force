import { ConversationsLayout } from "../components/ConversationsLayout"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { Flex } from "@artsy/palette"

interface Conversation2RouteProps {
  viewer: Conversation2Route_viewer
  conversation: Conversation2Route_conversation
}

const Conversation2Route: React.FC = () => {
  return (
    <>
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
    </>
  )
}

export const Conversation2RouteFragmentContainer = createFragmentContainer(
  Conversation2Route,
  {
    viewer: graphql`
      fragment Conversation2Route_viewer on Viewer
        @argumentDefinitions(
          conversationId: { type: "String!" }
          sellerId: { type: "ID!" }
          partnerId: { type: "String!" }
          toBeReplied: { type: "Boolean" }
          hasReply: { type: "Boolean" }
        ) {
        ...ConversationHeader_viewer
          @arguments(conversationId: $conversationId, sellerId: $sellerId)
        ...ConversationDetails_viewer
          @arguments(conversationId: $conversationId, sellerId: $sellerId)
        ...ConversationsSidebar_viewer
          @arguments(
            partnerId: $partnerId
            sellerId: $sellerId
            toBeReplied: $toBeReplied
            hasReply: $hasReply
          )
      }
    `,
    conversation: graphql`
      fragment Conversation2Route_conversation on Conversation {
        ...ConversationReply_conversation
        ...ConversationMessages_conversation
      }
    `,
  }
)
