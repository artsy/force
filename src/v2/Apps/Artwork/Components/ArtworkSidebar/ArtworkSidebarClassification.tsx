import { Box, Clickable, Text } from "@artsy/palette"
import Modal from "v2/Components/Modal/Modal"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassification_artwork } from "v2/__generated__/ArtworkSidebarClassification_artwork.graphql"
import * as Schema from "v2/Artsy/Analytics/Schema"
import track from "react-tracking"
import { ArtworkClassificationsQueryRenderer } from "v2/Components/ArtworkClassifications"

export interface ArtworkSidebarClassificationProps {
  artwork: ArtworkSidebarClassification_artwork
}

interface State {
  isModalOpen: boolean
}

@track()
export class ArtworkSidebarClassification extends React.Component<
  ArtworkSidebarClassificationProps,
  State
> {
  state = {
    isModalOpen: false,
  }

  @track({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.Sidebar,
    subject: Schema.Subject.Classification,
    type: Schema.Type.Link,
  })
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { artwork } = this.props

    if (!artwork.attributionClass) {
      return null
    }

    return (
      <Box>
        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Artwork classifications"
          cta={{ isFixed: false, onClick: () => this.closeModal(), text: "OK" }}
        >
          <ArtworkClassificationsQueryRenderer />
        </Modal>

        <Text variant="caption" mt={2}>
          <Clickable
            onClick={this.openModal.bind(this)}
            textDecoration="underline"
            color="black60"
          >
            {artwork.attributionClass.shortDescription}
          </Clickable>
          .
        </Text>
      </Box>
    )
  }
}

export const ArtworkSidebarClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassification,
  {
    artwork: graphql`
      fragment ArtworkSidebarClassification_artwork on Artwork {
        attributionClass {
          shortDescription
        }
      }
    `,
  }
)
