import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { Flex } from "@artsy/palette"
import { Resizer } from "Apps/Conversations2/components/Resizer"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"
import { useMobileLayoutActions } from "Apps/Conversations2/hooks/useMobileLayoutActions"
import { ConversationsSidebar } from "Apps/Conversations2/components/Sidebar/ConversationsSidebar"
import { ConversationHeader } from "Apps/Conversations2/Routes/Conversation/Components/ConversationHeader"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations2/Routes/Conversation/Components/ConversationMessages"
import { ConversationReply } from "Apps/Conversations2/Routes/Conversation/Components/ConversationReply"
import { ConversationDetails } from "Apps/Conversations2/components/Details/ConversationDetails"
import { Conversation2Route_viewer$data } from "__generated__/Conversation2Route_viewer.graphql"
import { Conversation2Route_conversation$data } from "__generated__/Conversation2Route_conversation.graphql"
import { Fragment, Suspense } from "react"
import { ConversationsSidebarSkeleton } from "Apps/Conversations2/components/Sidebar/ConversationsSidebarSkeleton"

const COLUMN_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`
const MOBILE_HEIGHT = `calc(100dvh - ${DESKTOP_NAV_BAR_HEIGHT}px)`

interface Conversation2RouteProps {
  viewer: Conversation2Route_viewer$data
  conversation: Conversation2Route_conversation$data
}

const Conversation2Route: React.FC<Conversation2RouteProps> = ({
  viewer,
  conversation,
}) => {
  const {
    currentColumn,
    goToDetails,
    goToSidebar,
    goToConversation,
  } = useMobileLayoutActions()

  const ClientOnlySuspense = (typeof window !== "undefined"
    ? Suspense
    : Fragment) as typeof Suspense

  return (
    <Flex flex={1} flexGrow={1} height="100%">
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
              <ClientOnlySuspense fallback={<ConversationsSidebarSkeleton />}>
                <ConversationsSidebar viewer={viewer} />
              </ClientOnlySuspense>
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
                flex={1}
                width="100%"
              >
                {/* TODO: Do we need a header? We have the details sidebar */}
                {/* <ConversationHeader conversation={conversation} /> */}

                <Flex height="90%">
                  <ClientOnlySuspense fallback={null}>
                    <ConversationMessagesPaginationContainer
                      conversation={conversation}
                    />
                  </ClientOnlySuspense>
                </Flex>

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
              <ConversationDetails conversation={conversation} />
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
          <ConversationsSidebar viewer={viewer} />
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
            conversation={conversation}
            onGoToConversations={goToSidebar}
            onGoToDetails={goToDetails}
          />

          <ClientOnlySuspense fallback={null}>
            <ConversationMessagesPaginationContainer
              conversation={conversation}
            />
          </ClientOnlySuspense>

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
          <ConversationDetails
            conversation={conversation}
            onClose={goToConversation}
          />
        </Flex>
      </Media>
    </Flex>
  )
}

export const Conversation2RouteFragmentContainer = createFragmentContainer(
  Conversation2Route,
  {
    viewer: graphql`
      fragment Conversation2Route_viewer on Viewer
        @argumentDefinitions(
          toBeReplied: { type: "Boolean" }
          hasReply: { type: "Boolean" }
        ) {
        ...ConversationsSidebar_viewer
          @arguments(toBeReplied: $toBeReplied, hasReply: $hasReply)
      }
    `,
    conversation: graphql`
      fragment Conversation2Route_conversation on Conversation {
        ...ConversationHeader_conversation
        ...ConversationDetails_conversation
        ...ConversationReply_conversation
        ...ConversationMessages_conversation
      }
    `,
  }
)
