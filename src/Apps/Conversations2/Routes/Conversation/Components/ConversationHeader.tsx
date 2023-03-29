import {
  Flex,
  Text,
  Image,
  Button,
  Box,
  Clickable,
  Spacer,
} from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { useTracking } from "react-tracking"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"
import { RouterLink } from "System/Router/RouterLink"

const DROP_SHADOW = "0 2px 10px rgba(0, 0, 0, .08)"

interface ConversationHeaderProps {
  viewer: ConversationHeader_viewer$key
  onGoToConversations?: () => void
  onGoToDetails?: () => void
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  viewer,
  onGoToConversations,
  onGoToDetails,
}) => {
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment ConversationHeader_viewer on Viewer
        @argumentDefinitions(
          conversationId: { type: "String!" }
          sellerId: { type: "ID!" }
        ) {
        conversation(id: $conversationId) @required(action: NONE) {
          from {
            name
          }
          items {
            item {
              __typename
              ... on Artwork {
                id
                slug
                date
                title
                artist {
                  name
                }
                image {
                  url
                }
              }
            }
          }
          orderConnection(
            first: 1
            states: [
              APPROVED
              FULFILLED
              SUBMITTED
              PROCESSING_APPROVAL
              REFUNDED
              CANCELED
            ]
            sellerId: $sellerId
          ) {
            edges @required(action: NONE) {
              node {
                state @required(action: NONE)
              }
            }
          }
        }
      }
    `,
    viewer
  )

  const item = data?.conversation.items?.[0]?.item

  if (!item || item?.__typename !== "Artwork") {
    return null
  }

  const order = extractNodes(data.conversation.orderConnection)[0]

  return (
    <>
      {/* Desktop view */}
      <Media greaterThan="sm">
        <Box
          p={2}
          borderBottom="1px solid"
          borderBottomColor="black15"
          style={{ boxShadow: DROP_SHADOW }}
        >
          <Text variant="lg">From {data.conversation.from.name}</Text>

          <Spacer y={2} />

          <Flex justifyContent="space-between">
            <Image
              src={item.image?.url!}
              height={50}
              width={50}
              alt={`Artwork image of ${item.title}`}
            />

            <Spacer x={1} />

            <Flex flexDirection="column" flexGrow={1}>
              <Text>{item.artist?.name}</Text>
              <Text color="black60">
                <Text fontStyle="italic" display="inline">
                  {item.title}
                </Text>
                {item.date && `, ${item.date}`}
              </Text>
            </Flex>

            <RouterLink
              to={`/artwork/${item.slug}`}
              onClick={() =>
                trackEvent({
                  action: "Click",
                  label: "View artwork",
                  context_module: "conversations",
                  artwork_id: item.id,
                })
              }
            >
              <Button variant="secondaryBlack" size="small">
                View Artwork
              </Button>
            </RouterLink>
          </Flex>
        </Box>
      </Media>

      {/* Mobile view */}
      <Media lessThan="md">
        <Box
          px={2}
          py={1}
          backgroundColor="white100"
          borderBottom="1px solid"
          borderBottomColor="black15"
          style={{ boxShadow: DROP_SHADOW }}
        >
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Clickable
              onClick={onGoToConversations}
              display="flex"
              alignItems="center"
              data-testid="go-to-conversation-button"
            >
              <ChevronLeftIcon />
              <Spacer x={1} />
              <Text variant="xs">From {data.conversation.from.name}</Text>
            </Clickable>

            <Button
              variant={
                order?.state === "SUBMITTED" ? "primaryBlack" : "secondaryBlack"
              }
              size="small"
              onClick={() => {
                trackEvent({
                  action: "Click",
                  label: "Review",
                  context_module: "conversations",
                  artwork_id: item.id,
                })
                onGoToDetails?.()
              }}
            >
              Review
            </Button>
          </Flex>

          <Spacer y={1} />

          <Flex>
            <Spacer x={30} />
            <Clickable
              minWidth={0}
              onClick={() => {
                trackEvent({
                  action: "Click",
                  label: "View conversation artwork",
                  context_module: "conversations",
                  artwork_id: item.id,
                })
                onGoToDetails?.()
              }}
            >
              <Flex alignItems="center" minWidth={0}>
                <Image
                  src={item.image?.url!}
                  height={24}
                  width={24}
                  alt={`Artwork image of ${item.title}`}
                />

                <Spacer x={1} />

                <Text variant="xs" style={{ whiteSpace: "nowrap" }}>
                  {item.artist?.name}
                </Text>

                <Spacer x={1} />

                <Text color="black60" variant="xs" overflowEllipsis>
                  <Text fontStyle="italic" display="inline" variant="xs">
                    {item.title}
                  </Text>
                  {item.date && `, ${item.date}`}
                </Text>
              </Flex>
            </Clickable>
          </Flex>
        </Box>
      </Media>
    </>
  )
}
