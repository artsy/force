import { Clickable, Flex, Separator } from "@artsy/palette"
import { ConversationHelpCenter } from "./ConversationHelpCenter"
import { graphql, useFragment } from "react-relay"
import { OrderInformation } from "./OrderInformation/OrderInformation"
import { ConversationArtwork } from "./ConversationArtwork"
import { ConversationManageThisInquiry } from "./ConversationManageThisInquiry"
import CloseIcon from "@artsy/icons/CloseIcon"
import styled from "styled-components"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"
import { ConversationCollectorProfileHeader } from "Apps/Conversations2/components/Details/CollectorProfile/ConversationCollectorProfileHeader"
import { ConversationCollectorProfileInformation } from "Apps/Conversations2/components/Details/CollectorProfile/ConversationCollectorProfileInformation"
import { ConversationDetails_conversation$key } from "__generated__/ConversationDetails_conversation.graphql"

interface ConversationDetailsProps {
  conversation: ConversationDetails_conversation$key
  onClose?: () => void
}

export const ConversationDetails: React.FC<ConversationDetailsProps> = ({
  conversation,
  onClose,
}) => {
  const data = useFragment(
    graphql`
      fragment ConversationDetails_conversation on Conversation {
        fromUser {
          ...ConversationCollectorProfileHeader_user
          collectorProfile {
            ...ConversationCollectorProfileInformation_collectorProfileType
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
              __typename
              ...OrderInformation_order
            }
          }
        }
        ...ConversationArtwork_conversation
        ...ConversationManageThisInquiry_conversation
        ...ConversationHelpCenter_conversation
      }
    `,
    conversation
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

      {order && (
        <>
          <OrderInformation order={order} />
          <Separator borderWidth={2} my={4} />
        </>
      )}

      <ConversationArtwork conversation={data} />
      <Media lessThan="md">
        <Separator borderWidth={2} my={4} />
      </Media>

      {!!data?.fromUser && (
        <>
          <ConversationCollectorProfileHeader user={data.fromUser} />
          <Separator my={2} />
          <ConversationCollectorProfileInformation
            collectorProfileType={data?.fromUser?.collectorProfile!}
          />
          <Separator borderWidth={2} my={4} />
        </>
      )}

      <ConversationManageThisInquiry conversation={data} />
      <Separator borderWidth={2} my={4} />
      <ConversationHelpCenter conversation={data} />
    </Flex>
  )
}

const CloseButton = styled(Clickable)`
  position: absolute;
  right: 0;
  top: 0;
`
