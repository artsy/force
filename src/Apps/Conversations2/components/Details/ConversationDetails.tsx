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
import { ConversationDetails_viewer$key } from "__generated__/ConversationDetails_viewer.graphql"

interface ConversationDetailsProps {
  viewer: ConversationDetails_viewer$key
  onClose?: () => void
}

export const ConversationDetails: React.FC<ConversationDetailsProps> = ({
  viewer,
  onClose,
}) => {
  const data = useFragment(
    graphql`
      fragment ConversationDetails_viewer on Viewer
        @argumentDefinitions(
          conversationId: { type: "String!" }
          sellerId: { type: "ID!" }
        ) {
        conversation(id: $conversationId) @required(action: NONE) {
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
            sellerId: $sellerId
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
      }
    `,
    viewer
  )

  if (!data) {
    return null
  }

  const order = extractNodes(data.conversation.orderConnection)[0]

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

      <Media lessThan="md">
        <ConversationArtwork conversation={data.conversation} />
        <Separator borderWidth={2} my={4} />
      </Media>

      {!!data?.conversation.fromUser && (
        <>
          <ConversationCollectorProfileHeader
            user={data.conversation.fromUser}
          />
          <Separator my={2} />
          <ConversationCollectorProfileInformation
            collectorProfileType={
              data?.conversation?.fromUser?.collectorProfile!
            }
          />
          <Separator borderWidth={2} my={4} />
        </>
      )}

      <ConversationManageThisInquiry conversation={data.conversation} />
      <Separator borderWidth={2} my={4} />
      <ConversationHelpCenter conversation={data.conversation} />
    </Flex>
  )
}

const CloseButton = styled(Clickable)`
  position: absolute;
  right: 0;
  top: 0;
`
