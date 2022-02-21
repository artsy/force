import { Clickable, Text } from "@artsy/palette"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassification_artwork$data } from "v2/__generated__/ArtworkSidebarClassification_artwork.graphql"
import * as Schema from "v2/System/Analytics/Schema"
import track from "react-tracking"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "v2/Apps/Artwork/Components/ArtworkSidebarClassificationsModal"

// TODO:
// - Check classification modal

export interface ArtworkSidebarClassificationProps {
  artwork: ArtworkSidebarClassification_artwork$data
}

interface State {
  isModalOpen: boolean
}

@track()
export class ArtworkSidebarClassification extends Component<
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
      <>
        <ArtworkSidebarClassificationsModalQueryRenderer
          onClose={this.closeModal}
          show={this.state.isModalOpen}
        />

        <Text variant="xs" mt={2}>
          <Clickable
            onClick={this.openModal.bind(this)}
            textDecoration="underline"
            color="black60"
          >
            {artwork.attributionClass.shortDescription}
          </Clickable>
          .
        </Text>
      </>
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
