import { Box, Spacer, Text } from "@artsy/palette"
import Modal from "v2/Components/Modal/Modal"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { ArtworkSidebarClassification_artwork } from "v2/__generated__/ArtworkSidebarClassification_artwork.graphql"
import * as Schema from "v2/Artsy/Analytics/Schema"
import track from "react-tracking"

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
    subject: Schema.Subject.Classification,
    type: Schema.Type.Link,
    context_module: Schema.ContextModule.Sidebar,
    action_type: Schema.ActionType.Click,
  })
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { artwork } = this.props
    if (!artwork.attribution_class) {
      return null
    }
    return (
      <ClassificationContainer>
        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Artwork classifications"
          cta={{ text: "OK", onClick: () => this.closeModal(), isFixed: false }}
        >
          <ClassificationDetails />
        </Modal>
        <Box color="black60" textAlign="left">
          <Spacer mt={2} />
          <Text variant="caption">
            <ClassificationLink onClick={this.openModal.bind(this)}>
              {artwork.attribution_class.short_description}
            </ClassificationLink>
            .
          </Text>
        </Box>
      </ClassificationContainer>
    )
  }
}

export const ArtworkSidebarClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassification,
  {
    artwork: graphql`
      fragment ArtworkSidebarClassification_artwork on Artwork {
        attribution_class: attributionClass {
          short_description: shortDescription
        }
      }
    `,
  }
)

export const ClassificationLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`
const ClassificationContainer = Box

const ClassificationDetails = () => {
  const classificationOptions = [
    {
      name: "Unique",
      long_description: "One of a kind piece, created by the artist.",
    },
    {
      name: "Limited edition",
      long_description: [
        "Original works created in multiple with direct involvement of the artist.",
        "Generally, less than 150 pieces total.",
      ].join(" "),
    },
    {
      name: "Made-to-order",
      long_description:
        "A piece that is made-to-order, taking into account the collector’s preferences.",
    },
    {
      name: "Reproduction",
      long_description: [
        "Reproduction of an original work authorized by artist’s studio or estate.",
        "The artist was not directly involved in production.",
      ].join(" "),
    },
    {
      name: "Editioned multiple",
      long_description: [
        "Pieces created in larger limited editions, authorized by the artist’s studio or estate.",
        "Not produced with direct involvement of the artist.",
      ].join(" "),
    },
    {
      name: "Non-editioned multiple",
      long_description: [
        "Works made in unlimited or unknown numbers of copies, authorized by the artist’s studio or estate.",
        "Not produced with direct involvement of the artist.",
      ].join(" "),
    },
    {
      name: "Ephemera",
      long_description: [
        "Items related to the artist, created or manufactured for a specific, limited use.",
        "This includes exhibition materials, memorabilia, autographs, etc.",
      ].join(" "),
    },
  ]

  return (
    <>
      <Box mt={1} mb={3}>
        {classificationOptions.map(option => {
          return (
            <React.Fragment key={option.name}>
              <Text variant="mediumText">{option.name}</Text>
              <Text variant="text" mb={2}>
                {option.long_description}
              </Text>
            </React.Fragment>
          )
        })}
      </Box>
      <Text variant="caption" color="black60" mb={3}>
        Our partners are responsible for providing accurate classification
        information for all works.
      </Text>
    </>
  )
}
