import { Button, Modal, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkDetailsMediumModal_artwork } from "v2/__generated__/ArtworkDetailsMediumModal_artwork.graphql"

interface ArtworkDetailsMediumModalProps {
  artwork: ArtworkDetailsMediumModal_artwork
  show: boolean
  onClose(): void
}

export const ArtworkDetailsMediumModal: React.FC<ArtworkDetailsMediumModalProps> = ({
  artwork,
  show,
  onClose,
}) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={artwork.mediumType.name}
      FixedButton={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Text color="black100">{artwork.mediumType.longDescription}</Text>
    </Modal>
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
