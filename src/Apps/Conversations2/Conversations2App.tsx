import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay/fetchRelayData"
import { graphql } from "react-relay"
import { conversationsV2Query } from "__generated__/conversationsV2Query.graphql"
import { extractNodes } from "utils/extractNodes"
import { getUserFromSession } from "system/user"

import { Box } from "@artsy/palette"
import { useIntersectionObserver } from "utils/hooks/useIntersectionObserver"
import { useRouter } from "next/router"
import { Media } from "utils/responsive"

/**
 * This page simply returns the first conversation on the server and redirects
 * to the appropriate conversation ID page.
 */

export const DEFAULT_CONVERSATION_ID = "new"

interface ConversationsV2StubPageProps {
  initialConversationID?: string
}

const ConversationsV2StubPage: React.FC<ConversationsV2StubPageProps> = ({
  initialConversationID,
}) => {
  const { replace } = useRouter()

  return (
    <>
      <Media greaterThan="sm">
        <Sentinel
          onIntersection={() =>
            replace(
              `/conversations/${
                initialConversationID ?? DEFAULT_CONVERSATION_ID
              }`
            )
          }
        />
      </Media>
      <Media lessThan="md">
        <Sentinel
          onIntersection={() =>
            replace(`/conversations/${DEFAULT_CONVERSATION_ID}`)
          }
        />
      </Media>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserFromSession(ctx.req, ctx.res)
  const partnerId = user?.currentPartner?._id ?? ""

  const props = await fetchRelayData<conversationsV2Query>({
    query: graphql`
      query conversationsV2Query($partnerId: String!) {
        conversationsConnection(
          first: 1
          type: PARTNER
          partnerId: $partnerId
        ) {
          edges {
            node {
              internalID
            }
          }
        }
      }
    `,
    cache: false,
    variables: {
      partnerId,
    },
    ctx,
  })

  const initialConversationID = extractNodes(props.conversationsConnection)[0]
    ?.internalID

  return { props: { initialConversationID } }
}

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

export default ConversationsV2StubPage
