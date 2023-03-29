import { Box, Spacer, Text } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { graphql, useFragment } from "react-relay"
import { ConversationHelpCenter_conversation$key } from "__generated__/ConversationHelpCenter_conversation.graphql"
import { RouterLink } from "System/Router/RouterLink"
interface ConversationHelpCenterProps {
  conversation: ConversationHelpCenter_conversation$key
}

export const ConversationHelpCenter: React.FC<ConversationHelpCenterProps> = ({
  conversation,
}) => {
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment ConversationHelpCenter_conversation on Conversation {
        items {
          item {
            ... on Artwork {
              id
            }
          }
        }
      }
    `,
    conversation
  )

  const onClick = () => {
    trackEvent({
      action: "Click",
      label: "Help article link",
      context_module: "conversations",
      artwork_id: data.items?.[0]?.item?.id,
    })
  }

  return (
    <Box>
      <Text variant="lg">Help Center</Text>
      <Spacer y={2} />
      <RouterLink
        to="https://help.artsy.net/hc/en-us/articles/360047666393"
        textDecoration="underline"
        // textColor="black60"
        onClick={onClick}
      >
        <Text variant="sm">Helpful Tips About Artsy Inquiries</Text>
      </RouterLink>
      <Spacer y={2} />
      <RouterLink
        to="https://help.artsy.net/hc/en-us/articles/360047154134"
        textDecoration="underline"
        // textColor="black60"
        onClick={onClick}
      >
        <Text variant="sm">Security Best Practices For Artsy CMS</Text>
      </RouterLink>
      <Spacer y={2} />
      <RouterLink
        to="https://help.artsy.net/hc/en-us/articles/360047805893"
        textDecoration="underline"
        // textColor="black60"
        onClick={onClick}
      >
        <Text variant="sm">Stop Phishing Attempts</Text>
      </RouterLink>
      <Spacer y={2} />
      <RouterLink
        to="https://help.artsy.net/hc/en-us/articles/360047806153"
        textDecoration="underline"
        // textColor="black60"
        onClick={onClick}
      >
        <Text variant="sm">Identify Suspicious Collectors</Text>
      </RouterLink>
    </Box>
  )
}
