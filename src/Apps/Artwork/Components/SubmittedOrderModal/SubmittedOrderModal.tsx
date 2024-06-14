import { Button, Message, ModalDialog, Spacer, Text } from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  getStatusCopy,
  continueToInboxText,
} from "Apps/Order/Utils/getStatusCopy"
import { RouterLink } from "System/Components/RouterLink"
import { SubmittedOrderModal_submittedOrder$data } from "__generated__/SubmittedOrderModal_submittedOrder.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SubmittedOrderModalQuery } from "__generated__/SubmittedOrderModalQuery.graphql"

interface SubmittedOrderModalProps {
  submittedOrder: SubmittedOrderModal_submittedOrder$data
}

const SubmittedOrderModal: FC<SubmittedOrderModalProps> = ({
  submittedOrder,
}) => {
  const [isOpen, setIsOpen] = useState(true)

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
      <RouterLink to="/user/conversations" onClick={handleClose}>
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
      }
    `,
  }
)

export const SubmittedOrderModalQueryRenderer: FC<{ orderId: string }> = ({
  orderId,
}) => {
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
          }
        }
      `}
    />
  )
}
