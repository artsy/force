import { Button, ModalDialog, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkDetailsMediumModal_artwork$data } from "__generated__/ArtworkDetailsMediumModal_artwork.graphql"

interface ArtworkDetailsMediumModalProps {
  artwork: ArtworkDetailsMediumModal_artwork$data
  show: boolean
  onClose(): void
}

export const ArtworkDetailsMediumModal: React.FC<ArtworkDetailsMediumModalProps> = ({
  artwork,
  show,
  onClose,
}) => {
  if (!show || !artwork.mediumType) return null

  return (
    <ModalDialog
      onClose={onClose}
      title={artwork.mediumType.name ?? "Unknown"}
      footer={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Text variant="sm">{artwork.mediumType.longDescription}</Text>
    </ModalDialog>
  )
}

export const ArtworkDetailsMediumModalFragmentContainer = createFragmentContainer(
  ArtworkDetailsMediumModal,
  {
    artwork: graphql`
      fragment ArtworkDetailsMediumModal_artwork on Artwork {
        mediumType {
          name
          longDescription
        }
      }
    `,
  }
)
