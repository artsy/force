import { Button, Message, ModalDialog, Text } from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  getStatusCopy,
  continueToInboxText,
} from "v2/Apps/Order/Utils/getStatusCopy"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SubmittedOrderModal_order } from "v2/__generated__/SubmittedOrderModal_order.graphql"

interface SubmittedOrderModalProps {
  order: SubmittedOrderModal_order
}

const SubmittedOrderModal: FC<SubmittedOrderModalProps> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(true)
  const handleClose = () => setIsOpen(false)

  const { mode, stateExpiresAt } = order
  const { title, description } = getStatusCopy({
    displayState: "SUBMITTED",
    mode,
    stateExpiresAt,
  })

  return isOpen ? (
    <ModalDialog title={title as string} onClose={handleClose}>
      <Message>{description}</Message>
      <Text>{continueToInboxText()}</Text>
      <RouterLink to="/user/conversations" onClick={handleClose}>
        <Button mt={2} width="100%">
          Go to Inbox
        </Button>
      </RouterLink>
    </ModalDialog>
  ) : null
}

export const SubmittedOrderModalFragmentContainer = createFragmentContainer<
  SubmittedOrderModalProps
>(SubmittedOrderModal, {
  order: graphql`
    fragment SubmittedOrderModal_order on CommerceOrder {
      mode
      stateExpiresAt(format: "MMM D")
    }
  `,
})
