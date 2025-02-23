import { Button, Message, ModalDialog, Spacer, Text } from "@artsy/palette"
import {
  continueToInboxText,
  getStatusCopy,
} from "Apps/Order/Utils/getStatusCopy"
import { RouterLink } from "System/Components/RouterLink"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { SubmittedOrderModalQuery } from "__generated__/SubmittedOrderModalQuery.graphql"
import type { SubmittedOrderModal_submittedOrder$data } from "__generated__/SubmittedOrderModal_submittedOrder.graphql"
import { type FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface SubmittedOrderModalProps {
  submittedOrder: SubmittedOrderModal_submittedOrder$data
}

const SubmittedOrderModal: FC<
  React.PropsWithChildren<SubmittedOrderModalProps>
> = ({ submittedOrder }) => {
  const [isOpen, setIsOpen] = useState(true)
  const linkUrl = submittedOrder.impulseConversationId
    ? `/user/conversations/${submittedOrder.impulseConversationId}`
    : "/user/conversations"

  if (!isOpen) return null

  const handleClose = () => setIsOpen(false)
  const { title, description } = getStatusCopy({
    displayState: "SUBMITTED",
    mode: "OFFER",
    stateExpiresAt: submittedOrder.stateExpiresAt,
  })

  return (
    <ModalDialog title={title as string} onClose={handleClose}>
      <Message>{description}</Message>
      <Spacer y={2} />
      <Text>{continueToInboxText}</Text>
      <RouterLink to={linkUrl} onClick={handleClose}>
        <Button mt={2} width="100%">
          Go to Inbox
        </Button>
      </RouterLink>
    </ModalDialog>
  )
}

export const SubmittedOrderModalFragmentContainer = createFragmentContainer(
  SubmittedOrderModal,
  {
    submittedOrder: graphql`
      fragment SubmittedOrderModal_submittedOrder on CommerceOrder {
        stateExpiresAt(format: "MMM D")
        impulseConversationId
      }
    `,
  },
)

export const SubmittedOrderModalQueryRenderer: FC<
  React.PropsWithChildren<{
    orderId: string
  }>
> = ({ orderId }) => {
  return (
    <SystemQueryRenderer<SubmittedOrderModalQuery>
      variables={{ orderId }}
      render={({ props }) => {
        if (!props?.submittedOrder) {
          return null
        }

        return (
          <SubmittedOrderModalFragmentContainer
            submittedOrder={props.submittedOrder}
          />
        )
      }}
      query={graphql`
        query SubmittedOrderModalQuery($orderId: ID!) {
          submittedOrder: commerceOrder(id: $orderId) {
            ...SubmittedOrderModal_submittedOrder
            impulseConversationId
          }
        }
      `}
    />
  )
}
