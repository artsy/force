import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { Flex } from "@artsy/palette"
import { Resizer } from "Apps/Conversations2/components/Resizer"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"
import { useMobileLayoutActions } from "Apps/Conversations2/hooks/useMobileLayoutActions"
import { ConversationsSidebar } from "Apps/Conversations2/components/Sidebar/ConversationsSidebar"
import { ConversationHeader } from "Apps/Conversations2/Routes/Conversation/Components/ConversationHeader"
import { ConversationMessages } from "Apps/Conversations2/Routes/Conversation/Components/ConversationMessages"
import { ConversationReply } from "Apps/Conversations2/Routes/Conversation/Components/ConversationReply"
import { ConversationDetails } from "Apps/Conversations2/components/Details/ConversationDetails"
import { Conversation2Route_viewer$data } from "__generated__/Conversation2Route_viewer.graphql"
import { Conversation2Route_conversation$data } from "__generated__/Conversation2Route_conversation.graphql"
import { Suspense } from "react"

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
              {/* <Suspense fallback={<ConversationsSidebarSkeleton />}> */}
              <ConversationsSidebar viewer={viewer} />
              {/* </Suspense> */}
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
                <ConversationHeader conversation={conversation} />

                {/* <Suspense fallback={null}> */}
                <ConversationMessages conversation={conversation} />
                {/* </Suspense> */}

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

          <ConversationMessages conversation={conversation} />

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
    </>
  )
}

export const Conversation2RouteFragmentContainer = createFragmentContainer(
  Conversation2Route,
  {
    viewer: graphql`
      fragment Conversation2Route_viewer on Viewer
        @argumentDefinitions(
          sellerId: { type: "ID!" }
          partnerId: { type: "String!" }
          toBeReplied: { type: "Boolean" }
          hasReply: { type: "Boolean" }
        ) {
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
      fragment Conversation2Route_conversation on Conversation
        @argumentDefinitions(sellerId: { type: "ID!" }) {
        ...ConversationHeader_conversation @arguments(sellerId: $sellerId)
        ...ConversationDetails_conversation @arguments(sellerId: $sellerId)
        ...ConversationReply_conversation
        ...ConversationMessages_conversation
      }
    `,
  }
)
