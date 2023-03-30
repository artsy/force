import {
  Box,
  Flex,
  Image,
  StackableBorderBox,
  Text,
  Tooltip,
} from "@artsy/palette"
import { UserVerifiedIcon } from "Apps/Conversations2/components/UserVerifiedIcon"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { ConversationsSidebarItem_conversation$key } from "__generated__/ConversationsSidebarItem_conversation.graphql"

interface ConversationsSidebarItemProps {
  conversation: ConversationsSidebarItem_conversation$key
  index: number
}

export const ConversationsSidebarItem: React.FC<ConversationsSidebarItemProps> = ({
  conversation,
  index,
}) => {
  const { match } = useRouter()
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
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
          states: [
            APPROVED
            FULFILLED
            SUBMITTED
            PROCESSING_APPROVAL
            REFUNDED
          ]
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
    `,
    conversation
  )

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

  // TODO: once we fix unread, uncomment line below
  // const fontWeight = data.unread ? { fontWeight: "bold" } : {}
  const fontWeight = {}

  return (
    <StackableBorderBox
      flexDirection="column"
      backgroundColor={
        match.params.conversationId === data.internalID ? "black5" : "white100"
      }
      style={{ borderLeft: 0, borderRight: 0, ...borderTop }}
    >
      <RouterLink
        to={`/user/conversations2/${data.internalID}?${
          match.location.query.conversationsFilter
            ? `conversationsFilter=${match.location.query.conversationsFilter}`
            : ""
        }`}
        textDecoration={"none"}
        onClick={() =>
          trackEvent({
            action: "Click",
            label: "Selected inquiry",
            context_module: "conversations",
            artwork_id: item.id,
          })
        }
      >
        <Flex alignItems="center">
          <Image
            src={item.image?.url}
            height={50}
            width={50}
            alt={`Artwork image of ${item.title}`}
          />

          <Flex flexDirection="column" mx={1} flex={1} overflow="hidden">
            <Box display="inherit">
              <Text variant="xs" {...fontWeight} overflowEllipsis>
                {data?.to?.name}
              </Text>
              {data.fromUser?.collectorProfile?.confirmedBuyerAt && (
                <Tooltip
                  size="sm"
                  content="Confirmed Buyer"
                  placement="top"
                  width={120}
                >
                  <Box ml={0.5}>
                    <UserVerifiedIcon data-testid="user-verified-icon" />
                  </Box>
                </Tooltip>
              )}
            </Box>
            <Text variant="xs" {...fontWeight} overflowEllipsis>
              {item.artist.name}
            </Text>
            <Text variant="xs" color="black60" overflowEllipsis>
              <Text fontStyle="italic" display="inline" variant="xs">
                {item.title}
              </Text>
              {item.date && `, ${item.date}`}
            </Text>
          </Flex>

          <Flex flexDirection="column" alignSelf="flex-start">
            <Text variant="xs" {...fontWeight}>
              {conversationType}
            </Text>
            <Flex flexDirection="row" alignItems="center">
              {/* TODO: once we fix unread, uncomment line below */}
              {/* {!!data.unread && (
                <Box
                  size={6}
                  backgroundColor="blue100"
                  borderRadius="50%"
                  mr={1}
                  data-testid="unread-dot"
                />
              )} */}
              <Text variant="xs" color="black60" {...fontWeight}>
                {data?.lastMessageAt}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </RouterLink>
    </StackableBorderBox>
  )
}
