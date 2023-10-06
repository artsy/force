import { Button, Text, Image, Flex, Spacer } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { graphql, useFragment } from "react-relay"
import { ConversationArtwork_conversation$key } from "__generated__/ConversationArtwork_conversation.graphql"
import { RouterLink } from "System/Router/RouterLink"

interface ConversationArtworkProps {
  conversation: ConversationArtwork_conversation$key
}

export const ConversationArtwork: React.FC<ConversationArtworkProps> = ({
  conversation,
}) => {
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment ConversationArtwork_conversation on Conversation {
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
                slug
              }
              image {
                url
              }
            }
          }
        }
      }
    `,
    conversation
  )

  const item = data?.items?.[0]?.item

  if (!item || item?.__typename !== "Artwork") {
    return null
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="lg">Artwork</Text>
      </Flex>

      <Spacer y={2} />

      <Flex>
        <Image
          src={item?.image?.url!}
          height={40}
          width={40}
          alt={`Artwork image of ${item?.title}`}
        />

        <Spacer x={1} />

        <Flex flexDirection="column">
          <RouterLink to={`/artist/${item?.artist?.slug}`}>
            <Text variant="xs">{item?.artist?.name}</Text>
          </RouterLink>
          <Text variant="xs" color="black60">
            <Text fontStyle="italic" display="inline" variant="xs">
              {item?.title}
            </Text>
            {item?.date && `, ${item?.date}`}
          </Text>
        </Flex>
      </Flex>

      <Spacer y={2} />

      <RouterLink
        to={`/artwork/${item?.slug}`}
        onClick={() => {
          trackEvent({
            action: "Click",
            label: "View artwork",
            context_module: "conversations",
            artwork_id: item?.id,
          })
        }}
      >
        <Button variant="secondaryBlack" size="small">
          View Artwork
        </Button>
      </RouterLink>
    </>
  )
}
