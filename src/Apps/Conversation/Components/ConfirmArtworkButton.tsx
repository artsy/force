import { useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import { Button, ButtonProps } from "@artsy/palette"
import { TappedConfirmArtwork } from "@artsy/cohesion"

import createLogger from "Utils/logger"
import { MakeInquiryOffer } from "../Mutation/MakeInquiryOfferMutation"
import { MakeInquiryOrder } from "../Mutation/MakeInquiryOrderMutation"

import { ConfirmArtworkButton_artwork$data } from "__generated__/ConfirmArtworkButton_artwork.graphql"

const logger = createLogger("Conversation/Components/ConfirmArtworkButton.tsx")

export interface ConfirmArtworkButtonProps extends ButtonProps {
  artwork: ConfirmArtworkButton_artwork$data
  relay: RelayProp
  editionSetID: string | null
  createsOfferOrder?: boolean
  conversationID: string
  trackingEvent?: TappedConfirmArtwork
}

export const ConfirmArtworkButton: React.FC<ConfirmArtworkButtonProps> = ({
  relay,
  artwork,
  editionSetID,
  conversationID,
  createsOfferOrder = true,
  disabled,
  variant,
  children,
  onClick,
}) => {
  const [isCommittingMutation, setIsCommittingMutation] = useState(false)
  const commitMutation = createsOfferOrder ? MakeInquiryOffer : MakeInquiryOrder
  const onMutationError = (error: Error) => {
    logger.error(error)
    // TODO: trigger error modal?
  }

  const handleCreateInquiryOrder = () => {
    if (isCommittingMutation) return
    setIsCommittingMutation(true)

    if (relay && relay.environment) {
      return commitMutation(
        relay.environment,
        conversationID,
        artwork.internalID,
        editionSetID,
        response => {
          setIsCommittingMutation(false)
          const { orderOrError } = createsOfferOrder
            ? response.createInquiryOfferOrder
            : response.createInquiryOrder
          if (orderOrError.__typename === "CommerceOrderWithMutationFailure") {
            onMutationError(orderOrError.error)
          } else if (
            orderOrError.__typename === "CommerceOrderWithMutationSuccess"
          ) {
            window.location.href = `/orders/${orderOrError.order.internalID}/offer`
          }
        },
        _error => {
          setIsCommittingMutation(false)
          onMutationError(_error)
        }
      )
    }
  }

  return (
    <Button
      onClick={event => {
        onClick?.(event)
        handleCreateInquiryOrder()
      }}
      loading={isCommittingMutation}
      disabled={disabled}
      variant={variant}
      flexGrow={1}
    >
      {children}
    </Button>
  )
}

export const ConfirmArtworkButtonFragmentContainer = createFragmentContainer(
  ConfirmArtworkButton,
  {
    artwork: graphql`
      fragment ConfirmArtworkButton_artwork on Artwork {
        internalID
      }
    `,
  }
)
