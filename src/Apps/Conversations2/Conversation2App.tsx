import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { Flex } from "@artsy/palette"
import { Resizer } from "Apps/Conversations2/components/Resizer"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"
import { useMobileLayoutActions } from "Apps/Conversations2/hooks/useMobileLayoutActions"
import { ConversationsSidebar } from "Apps/Conversations2/components/Sidebar/ConversationsSidebar"
import { ConversationHeader } from "Apps/Conversations2/components/ConversationHeader"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations2/components/ConversationMessages"
import { ConversationReply } from "Apps/Conversations2/components/ConversationReply"
import { ConversationDetails } from "Apps/Conversations2/components/Details/ConversationDetails"
import { Conversation2App_viewer$data } from "__generated__/Conversation2App_viewer.graphql"
import { Conversation2App_conversation$data } from "__generated__/Conversation2App_conversation.graphql"
import { Fragment, Suspense, useEffect } from "react"
import { ConversationsSidebarSkeleton } from "Apps/Conversations2/components/Sidebar/ConversationsSidebarSkeleton"

const COLUMN_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`
const MOBILE_HEIGHT = `calc(100dvh - ${DESKTOP_NAV_BAR_HEIGHT}px)`

interface Conversation2RouteProps {
  viewer: Conversation2App_viewer$data
  conversation: Conversation2App_conversation$data
}

const Conversation2App: React.FC<Conversation2RouteProps> = ({
  viewer,
  conversation,
}) => {
  const { currentColumn } = useMobileLayoutActions()

  // Work around to ensure that we don't get page transition jank by due to
  // navigating between different types of page layouts. Since convos fills
  // the screen, disable scrolling to hide the footer.
  useEffect(() => {
    window.scrollTo(0, 0)

    document.body.style.setProperty("overflow", "hidden")

    return () => {
      document.body.style.setProperty("overflow", "scroll")
    }
  })

  const ClientOnlySuspense = (typeof window !== "undefined"
    ? Suspense
    : Fragment) as typeof Suspense

  return (
    <Flex
      flex={1}
      flexGrow={1}
      position="relative"
      height={MOBILE_HEIGHT}
      zIndex={1}
      overflow={"hidden"}
    >
      {/*
        Desktop View
      */}

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

      {/*
        Mobile View
      */}

      <Media lessThan="md" style={{ width: "100%", margin: 0 }}>
        <Flex
          display={currentColumn === "sidebar" ? "flex" : "none"}
          height={MOBILE_HEIGHT}
          flexDirection="column"
          width="100%"
          margin={0}
        >
          <ConversationsSidebar viewer={viewer} />
        </Flex>

        {currentColumn === "conversation" && (
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
            <ConversationHeader conversation={conversation} />

            <ClientOnlySuspense fallback={null}>
              <ConversationMessagesPaginationContainer
                conversation={conversation}
              />
            </ClientOnlySuspense>

            <ConversationReply conversation={conversation} />
          </Flex>
        )}
      </Media>
    </Flex>
  )
}

export const Conversation2AppFragmentContainer = createFragmentContainer(
  Conversation2App,
  {
    viewer: graphql`
      fragment Conversation2App_viewer on Viewer
        @argumentDefinitions(
          toBeReplied: { type: "Boolean" }
          hasReply: { type: "Boolean" }
        ) {
        ...ConversationsSidebar_viewer
          @arguments(toBeReplied: $toBeReplied, hasReply: $hasReply)
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
