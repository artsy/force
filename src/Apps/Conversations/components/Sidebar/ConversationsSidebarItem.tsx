import { Box, Flex, Image, StackableBorderBox, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { ConversationsSidebarItem_conversation$key } from "__generated__/ConversationsSidebarItem_conversation.graphql"
import { getSidebarTotal } from "Apps/Conversations/components/Sidebar/Utils/getSidebarTotal"
import { useEffect, useRef } from "react"
import { getENV } from "Utils/getENV"

interface ConversationsSidebarItemProps {
  conversation: ConversationsSidebarItem_conversation$key
  index: number
}

export const ConversationsSidebarItem: React.FC<ConversationsSidebarItemProps> = ({
  conversation,
  index,
}) => {
  const data = useFragment(FRAGMENT, conversation)
  const { match } = useRouter()
  const { trackEvent } = useTracking()
  const scrollRef = useRef<HTMLDivElement>(null)

  const isSelected = match.params.conversationId === data.internalID

  // On mobile, the list item never gets a select state, since tapping instantly
  // sends the user to the messages view.
  const isHighlighted = isSelected && !getENV("IS_MOBILE")

  useEffect(() => {
    if (isSelected) {
      scrollRef.current?.scrollIntoView?.({ block: "center" })
    }
    // Only want this to fire on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const item = data?.items?.[0]?.item
  const orders = extractNodes(data?.orderConnection)

  if (!item || item.__typename !== "Artwork") {
    return null
  }

  const borderTop = index !== 0 ? {} : { borderTop: 0 }

  const conversationType =
    orders.length === 0
      ? "Inquiry"
      : orders[0].__typename === "CommerceBuyOrder"
      ? "Order"
      : "Offer"

  return (
    <StackableBorderBox
      flexDirection="column"
      backgroundColor={isHighlighted ? "black5" : "white100"}
      p={0}
      style={{ borderLeft: 0, borderRight: 0, ...borderTop }}
      ref={scrollRef as any}
    >
      <RouterLink
        to={`/user/conversations/${data.internalID}?${
          match.location.query.sidebarTotal
            ? `sidebarTotal=${getSidebarTotal()}`
            : ""
        }`}
        display="block"
        p={2}
        textDecoration="none"
        onClick={() => {
          trackEvent({
            action: "Click",
            label: "Selected inquiry",
            context_module: "conversations",
            artwork_id: item.id,
          })
        }}
      >
        <Flex alignItems="center" px={[0, 2]}>
          <Image
            src={item.image?.url}
            height={50}
            width={50}
            alt={`Artwork image of ${item.title}`}
          />

          <Flex flexDirection="column" mx={1} flex={1} overflow="hidden">
            <Box display="inherit">
              <Text variant="xs" overflowEllipsis>
                {data?.to?.name}
              </Text>
            </Box>

            <Text variant="xs" overflowEllipsis>
              {item.artist.name}
            </Text>

            <Text variant="xs" color="black60" overflowEllipsis>
              <Text fontStyle="italic" display="inline" variant="xs">
                {item.title}
              </Text>

              {item.date && `, ${item.date}`}
            </Text>

            {item.isUnlisted && (
              <Text display="inline" variant="xs">
                Exclusive Access
              </Text>
            )}
          </Flex>

          <Flex flexDirection="column" alignSelf="flex-start">
            <Text variant="xs">{conversationType}</Text>

            <Flex flexDirection="row" alignItems="center">
              <Text variant="xs" color="black60">
                {data?.lastMessageAt}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </RouterLink>
    </StackableBorderBox>
  )
}

const FRAGMENT = graphql`
  fragment ConversationsSidebarItem_conversation on Conversation {
    internalID
    from {
      name
    }
    fromUser {
      collectorProfile {
        confirmedBuyerAt
      }
    }
    to {
      name
    }
    lastMessageAt(format: "MMM D")

    orderConnection(
      last: 1
      states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL, REFUNDED]
    ) {
      edges {
        node {
          __typename
        }
      }
    }

    items {
      item @required(action: NONE) {
        __typename
        ... on Artwork {
          id
          title @required(action: NONE)
          date
          isUnlisted
          artist @required(action: NONE) {
            name @required(action: NONE)
          }
          image @required(action: NONE) {
            url(version: ["small", "square"]) @required(action: NONE)
          }
        }
      }
    }
  }
`
