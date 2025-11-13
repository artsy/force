import { ReviewOrderButton } from "Apps/Conversations/components/Details/OrderInformation/ReviewOrderButton"
import { useMobileLayoutActions } from "Apps/Conversations/hooks/useMobileLayoutActions"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import {
  Box,
  Button,
  Clickable,
  Flex,
  Image,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import type { ConversationHeader_conversation$key } from "__generated__/ConversationHeader_conversation.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ConversationHeaderProps {
  conversation: ConversationHeader_conversation$key
}

export const ConversationHeader: React.FC<
  React.PropsWithChildren<ConversationHeaderProps>
> = ({ conversation }) => {
  const { goToDetails, goToSidebar } = useMobileLayoutActions()

  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment ConversationHeader_conversation on Conversation {
        from {
          name
        }
        to {
          name
        }
        items {
          item {
            __typename
            ... on Artwork {
              internalID
              id
              slug
              date
              title
              artist(shallow: true) {
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
        ) {
          edges @required(action: NONE) {
            node {
              ...ReviewOrderButton_order
            }
          }
        }
      }
    `,
    conversation
  )

  const order = extractNodes(data.orderConnection)[0]

  const item = data?.items?.[0]?.item

  const { theme } = useTheme()

  if (!item || item?.__typename !== "Artwork") {
    return null
  }

  return (
    <>
      {/* Desktop view */}
      <Media greaterThan="xs">
        <Box
          p={2}
          borderBottom="1px solid"
          borderBottomColor="mono15"
          style={{ boxShadow: theme.effects.dropShadow }}
        >
          <Text variant="lg">From {data.from.name}</Text>

          <Spacer y={2} />

          <Flex justifyContent="space-between">
            {item.image?.url && (
              <Image
                src={item.image.url}
                height={50}
                width={50}
                alt={`Artwork image of ${item.title}`}
              />
            )}

            <Spacer x={1} />

            <Flex flexDirection="column" flexGrow={1}>
              <Text>{item.artist?.name}</Text>

              <Text color="mono60">
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
      <Media lessThan="sm">
        <Box
          px={2}
          py={1}
          backgroundColor="mono0"
          borderBottom="1px solid"
          borderBottomColor="mono15"
          style={{ boxShadow: theme.effects.dropShadow }}
        >
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Clickable
              onClick={goToSidebar}
              display="flex"
              alignItems="center"
              data-testid="go-to-conversation-button"
            >
              <ChevronLeftIcon />
              <Spacer x={1} />
              <Text variant="xs">To {data.to.name}</Text>
            </Clickable>

            <ReviewOrderButton order={order} />
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
                goToDetails?.()
              }}
            >
              <Flex alignItems="center" minWidth={0}>
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    height={24}
                    width={24}
                    alt={`Artwork image of ${item.title}`}
                  />
                )}

                <Spacer x={1} />

                <Text variant="xs" style={{ whiteSpace: "nowrap" }}>
                  {item.artist?.name}
                </Text>

                <Spacer x={1} />

                <Text color="mono60" variant="xs" overflowEllipsis>
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
