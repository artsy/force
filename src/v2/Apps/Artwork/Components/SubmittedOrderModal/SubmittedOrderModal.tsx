import { Button, Message, ModalDialog, Spacer, Text } from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  getStatusCopy,
  continueToInboxText,
} from "v2/Apps/Order/Utils/getStatusCopy"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SubmittedOrderModal_me } from "v2/__generated__/SubmittedOrderModal_me.graphql"

interface SubmittedOrderModalProps {
  me: SubmittedOrderModal_me
  slug: string
}

const SubmittedOrderModal: FC<SubmittedOrderModalProps> = ({ slug, me }) => {
  const submittedOrder = me!.orders!.edges![0]!.node!
  const submittedOrderArtwork = submittedOrder.lineItems!.edges![0]!.node!
    .artwork!

  const [isOpen, setIsOpen] = useState(submittedOrderArtwork.slug === slug)

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
      <Spacer mb={2} />
      <Text>{continueToInboxText}</Text>
      <RouterLink to="/user/conversations" onClick={handleClose}>
        <Button mt={2} width="100%">
          Go to Inbox
        </Button>
      </RouterLink>
    </ModalDialog>
  )
}

export const SubmittedOrderModalFragmentContainer = createFragmentContainer<
  SubmittedOrderModalProps
>(SubmittedOrderModal, {
  me: graphql`
    fragment SubmittedOrderModal_me on Me {
      orders(
        states: [SUBMITTED]
        mode: OFFER
        first: 1
        sort: UPDATED_AT_DESC
      ) {
        edges {
          node {
            stateExpiresAt(format: "MMM D")
            lineItems {
              edges {
                node {
                  artwork {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
})
