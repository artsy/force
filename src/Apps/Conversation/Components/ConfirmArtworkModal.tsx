import { useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Button, Flex, ModalDialog, Separator, Spacer } from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { renderWithLoadProgress } from "System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { OwnerType } from "@artsy/cohesion"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"
import { CollapsibleArtworkDetailsFragmentContainer } from "./CollapsibleArtworkDetails"
import { EditionSelectBoxFragmentContainer } from "./EditionSelectBox"

import {
  ConfirmArtworkModalQuery,
  ConfirmArtworkModalQuery$data,
} from "__generated__/ConfirmArtworkModalQuery.graphql"
import { ConfirmArtworkModal_artwork$data } from "__generated__/ConfirmArtworkModal_artwork.graphql"
import { useTracking } from "react-tracking"

export interface ConfirmArtworkModalProps {
  artwork: ConfirmArtworkModal_artwork$data
  conversationID: string
  show: boolean
  closeModal: () => void
  createsOfferOrder: boolean
}

export const ConfirmArtworkModal: React.FC<ConfirmArtworkModalProps> = ({
  artwork,
  conversationID,
  show,
  closeModal,
  createsOfferOrder,
}) => {
  const { editionSets, isEdition } = { ...artwork }

  const initialSelectedEdition =
    editionSets?.length === 1 ? editionSets[0]!.internalID : null

  const tracking = useTracking()
  const [selectedEdition, setSelectedEdition] = useState<string | null>(
    initialSelectedEdition
  )

  const selectEdition = (editionSetID: string, isAvailable?: boolean) => {
    if (isAvailable) {
      setSelectedEdition(editionSetID)
    }
  }

  return show ? (
    <ModalDialog
      onClose={closeModal}
      title="Select edition set"
      footer={
        <Flex flexGrow={1}>
          <Button variant="secondaryBlack" flexGrow={1} onClick={closeModal}>
            Cancel
          </Button>
          <Spacer x={1} y={1} />
          <ConfirmArtworkButtonFragmentContainer
            artwork={artwork}
            disabled={!!isEdition && !selectedEdition}
            conversationID={conversationID}
            editionSetID={selectedEdition || null}
            onClick={() =>
              tracking.trackEvent({
                context_module: OwnerType.conversationMakeOfferConfirmArtwork,
                context_owner_type: OwnerType.conversation,
              })
            }
            createsOfferOrder={createsOfferOrder}
          >
            Confirm
          </ConfirmArtworkButtonFragmentContainer>
        </Flex>
      }
    >
      <CollapsibleArtworkDetailsFragmentContainer artwork={artwork} />
      <Separator mb={2} />
      {!!isEdition && editionSets?.length && (
        <Flex flexDirection="column">
          {editionSets?.map(edition => (
            <EditionSelectBoxFragmentContainer
              edition={edition!}
              selected={edition!.internalID === selectedEdition}
              onSelect={selectEdition}
              key={`edition-set-${edition?.internalID}`}
            />
          ))}
        </Flex>
      )}
    </ModalDialog>
  ) : null
}

export const ConfirmArtworkModalFragmentContainer = createFragmentContainer(
  ConfirmArtworkModal,
  {
    artwork: graphql`
      fragment ConfirmArtworkModal_artwork on Artwork {
        ...CollapsibleArtworkDetails_artwork
        ...ConfirmArtworkButton_artwork
        internalID
        isEdition
        editionSets {
          internalID
          ...EditionSelectBox_edition
        }
      }
    `,
  }
)

export const ConfirmArtworkModalQueryRenderer: React.FC<{
  artworkID: string
  conversationID: string
  show: boolean
  closeModal: () => void
  createsOfferOrder: boolean
}> = ({ artworkID, ...rest }) => {
  const { relayEnvironment } = useSystemContext()
  if (!artworkID) return null
  return (
    <SystemQueryRenderer<ConfirmArtworkModalQuery>
      environment={relayEnvironment}
      query={graphql`
        query ConfirmArtworkModalQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ConfirmArtworkModal_artwork
          }
        }
      `}
      variables={{
        artworkID,
      }}
      render={renderWithLoadProgress<ConfirmArtworkModalQuery$data>(
        ({ artwork }) => (
          <ConfirmArtworkModalFragmentContainer artwork={artwork!} {...rest} />
        )
      )}
    />
  )
}
