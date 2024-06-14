import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { Box, Flex, Spinner, Text } from "@artsy/palette"
import { useLoadMore } from "Apps/Conversations/hooks/useLoadMore"
import { extractNodes } from "Utils/extractNodes"
import { ConversationsSidebarEmpty } from "Apps/Conversations/components/Sidebar/ConversationsSidebarEmpty"
import { ConversationsSidebarItem } from "Apps/Conversations/components/Sidebar/ConversationsSidebarItem"
import { ConversationsSidebar_viewer$data } from "__generated__/ConversationsSidebar_viewer.graphql"
import { Sentinel } from "Components/Sentinal"
import { useEffect, useState } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { SIDEBAR_FETCH_PAGE_SIZE } from "Apps/Conversations/components/Sidebar/Utils/getSidebarTotal"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"

interface ConversationsSidebarProps {
  viewer: ConversationsSidebar_viewer$data
  relay: RelayPaginationProp
}

export const ConversationsSidebar: React.FC<ConversationsSidebarProps> = ({
  viewer,
  relay,
}) => {
  const { match } = useRouter()

  const [enableSilentSidebarRefetch, setEnableSilentSidebarRefetch] = useState(
    true
  )

  const { loadMore, shouldLoadMore } = useLoadMore({
    pageSize: SIDEBAR_FETCH_PAGE_SIZE,
    loadNext: relay.loadMore,
    isLoadingNext: relay.isLoading,
    hasNext: relay.hasMore,
  })

  const conversations = extractNodes(viewer.conversationsConnection)

  let totalDisplayedCount =
    viewer.conversationsConnection?.edges?.length ?? SIDEBAR_FETCH_PAGE_SIZE

  if (totalDisplayedCount < SIDEBAR_FETCH_PAGE_SIZE) {
    totalDisplayedCount = SIDEBAR_FETCH_PAGE_SIZE
  }

  useEffect(() => {
    if (!match.params.conversationId) {
      return
    }

    const url = new URL(
      `${window.location.origin}/user/conversations/${match.params.conversationId}`
    )

    const existingParams = match.location.query

    Object.entries(existingParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    url.searchParams.set(
      "sidebarTotal",
      String(totalDisplayedCount ?? SIDEBAR_FETCH_PAGE_SIZE)
    )

    // TODO:
    // We need to step outside of the normal next.js router query params state
    // because triggering a push to _only_ update query params will trigger
    // the route loading bar and a fetch. We just want to silently update.
    history.pushState({}, "", url)

    // No need for conversationID, as we want to preserve the sidebar state
    // across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalDisplayedCount])

  // Refetch messages in the background, but only when a user has scrolled to
  // the top of the convo list.
  useRefetchLatestMessagesPoll({
    intervalTime: 10000,
    clearWhen: !enableSilentSidebarRefetch,
    onRefetch: () => {
      if (!enableSilentSidebarRefetch) {
        return
      }
      // When refetching, check to see if we've loaded more, and if so, refetch
      // current total count of sidebar list
      const fetchSize =
        viewer.conversationsConnection?.edges?.length ?? SIDEBAR_FETCH_PAGE_SIZE

      relay.refetchConnection(
        fetchSize,
        {},
        {
          first: fetchSize,
        }
      )
    },
  })

  return (
    <Flex flexDirection="column" flex={1}>
      <Box
        p={2}
        px={2}
        position="sticky"
        top={0}
        flexDirection="column"
        backgroundColor="white100"
        borderBottom="1px solid"
        borderBottomColor="black15"
        zIndex={1}
      >
        <Text variant="lg">Inbox</Text>
      </Box>

      {conversations.length === 0 && <ConversationsSidebarEmpty />}

      <Sentinel
        onEnterView={() => setEnableSilentSidebarRefetch(true)}
        onExitView={() => setEnableSilentSidebarRefetch(false)}
      />

      {conversations.map((conversation, key) => {
        return (
          <ConversationsSidebarItem
            conversation={conversation}
            key={key}
            index={key}
          />
        )
      })}

      {shouldLoadMore && (
        <Box position="relative" my={2} p={1}>
          <Spinner />
        </Box>
      )}

      <Sentinel onEnterView={loadMore} />
    </Flex>
  )
}

export const ConversationsSidebarPaginationContainer = createPaginationContainer(
  ConversationsSidebar,
  {
    viewer: graphql`
      fragment ConversationsSidebar_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        )
        @refetchable(queryName: "ConversationsSidebar2PaginationQuery") {
        conversationsConnection(first: $first, after: $after, type: USER)
          @connection(
            key: "ConversationsSidebar_viewer_conversationsConnection"
          ) {
          edges {
            cursor
            node {
              internalID
              ...ConversationsSidebarItem_conversation
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: graphql`
      query ConversationsSidebarPaginationQuery($first: Int!, $after: String) {
        viewer {
          ...ConversationsSidebar_viewer
            @arguments(first: $first, after: $after)
        }
      }
    `,
  }
)
