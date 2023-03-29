/**
 * This page simply returns the first conversation on the server and redirects
 * to the appropriate conversation ID page.
 */

import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Media } from "Utils/Responsive"
import { Conversations2App_viewer$data } from "__generated__/Conversations2App_viewer.graphql"

export const DEFAULT_CONVERSATION_ID = "new"

interface ConversationsV2StubPageProps {
  viewer?: Conversations2App_viewer$data
}

export const Conversations2App: React.FC<ConversationsV2StubPageProps> = ({
  viewer,
}) => {
  const { router } = useRouter()

  const initialConversationID = extractNodes(viewer?.conversationsConnection)[0]
    ?.internalID

  return (
    <>
      <Media greaterThan="sm">
        <Sentinel
          onIntersection={() =>
            router.replace(
              `/user/conversations2/${
                initialConversationID ?? DEFAULT_CONVERSATION_ID
              }`
            )
          }
        />
      </Media>
      <Media lessThan="md">
        <Sentinel
          onIntersection={() =>
            router.replace(`/user/conversations2/${DEFAULT_CONVERSATION_ID}`)
          }
        />
      </Media>
    </>
  )
}

export const Conversations2AppFragmentContainer = createFragmentContainer(
  Conversations2App,
  {
    viewer: graphql`
      fragment Conversations2App_viewer on Viewer {
        conversationsConnection(
          first: 1
          type: PARTNER
          partnerId: "commerce-test-partner"
        ) {
          edges {
            node {
              internalID
            }
          }
        }
      }
    `,
  }
)

const Sentinel: React.FC<{
  onIntersection(): void
}> = ({ onIntersection }) => {
  const { ref } = useIntersectionObserver({
    once: false,
    options: { threshold: 0.5 },
    onIntersection,
  })

  return <Box ref={ref as any} />
}
