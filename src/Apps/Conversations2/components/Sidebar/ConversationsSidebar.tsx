import { graphql, usePaginationFragment } from "react-relay"
import { Box, Flex, Spinner } from "@artsy/palette"
import { useLoadMore } from "Apps/Conversations2/hooks/useLoadMore"
import { extractNodes } from "Utils/extractNodes"
import { ConversationsSidebarHeader } from "Apps/Conversations2/components/Sidebar/ConversationsSidebarHeader"
import { ConversationsSidebarEmpty } from "Apps/Conversations2/components/Sidebar/ConversationsSidebarEmpty"
import { ConversationsSidebarItem } from "Apps/Conversations2/components/Sidebar/ConversationsSidebarItem"
import { ConversationsSidebar_viewer$key } from "__generated__/ConversationsSidebar_viewer.graphql"
import { Sentinel } from "Components/Sentinal"

interface ConversationsSidebarProps {
  viewer: ConversationsSidebar_viewer$key
}

const PAGE_SIZE = 10

export const ConversationsSidebar: React.FC<ConversationsSidebarProps> = ({
  viewer,
}) => {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment ConversationsSidebar_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
          toBeReplied: { type: "Boolean" }
          hasReply: { type: "Boolean" }
        )
        @refetchable(queryName: "ConversationsSidebarPaginationQuery") {
        conversationsConnection(
          first: $first
          after: $after
          type: USER
          toBeReplied: $toBeReplied
          hasReply: $hasReply
        )
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
    viewer
  )

  const { loadMore } = useLoadMore({
    pageSize: PAGE_SIZE,
    loadNext,
    isLoadingNext,
    hasNext,
  })

  const conversations = extractNodes(data.conversationsConnection)

  return (
    <Flex flexDirection="column" flex={1}>
      <ConversationsSidebarHeader />

      {conversations.length === 0 && <ConversationsSidebarEmpty />}

      {conversations.map((conversation, key) => {
        return (
          <ConversationsSidebarItem
            conversation={conversation}
            key={key}
            index={key}
          />
        )
      })}

      {isLoadingNext && (
        <Box position="relative" my={2} p={1}>
          <Spinner />
        </Box>
      )}

      <Sentinel onEnterView={loadMore} />
    </Flex>
  )
}
