import CloseIcon from "@artsy/icons/CloseIcon"
import { Clickable, Flex } from "@artsy/palette"
import { ConversationAttachments } from "Apps/Conversations/components/Details/ConversationAttachments"
import { ConversationSupport } from "Apps/Conversations/components/Details/ConversationSupport"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ConversationDetails_conversation$key } from "__generated__/ConversationDetails_conversation.graphql"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import { ConversationArtwork } from "./ConversationArtwork"
import { ConversationOrderInformation } from "./OrderInformation/ConversationOrderInformation"

interface ConversationDetailsProps {
  conversation: ConversationDetails_conversation$key
  onClose?: () => void
}

export const ConversationDetails: React.FC<
  React.PropsWithChildren<ConversationDetailsProps>
> = ({ conversation, onClose }) => {
  const data = useFragment(
    graphql`
      fragment ConversationDetails_conversation on Conversation {
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
              __typename
              ...ConversationOrderInformation_order
            }
          }
        }
        ...ConversationArtwork_conversation
        ...ConversationAttachments_conversation
      }
    `,
    conversation,
  )

  if (!data) {
    return null
  }

  const order = extractNodes(data.orderConnection)[0]

  return (
    <Flex flexDirection="column">
      <Media lessThan="md">
        <CloseButton onClick={onClose} p={2}>
          <CloseIcon />
        </CloseButton>
      </Media>

      {order && <ConversationOrderInformation order={order} />}

      <ConversationArtwork conversation={data} />

      <ConversationAttachments conversation={data} />

      <ConversationSupport />
    </Flex>
  )
}

const CloseButton = styled(Clickable)`
  position: absolute;
  right: 0;
  top: 0;
`
