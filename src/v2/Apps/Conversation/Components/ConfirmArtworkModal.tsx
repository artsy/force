import {
  Button,
  Flex,
  Message,
  Modal,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  ConfirmArtworkModalQuery,
  ConfirmArtworkModalQueryResponse,
} from "v2/__generated__/ConfirmArtworkModalQuery.graphql"
import { ConfirmArtworkModal_artwork } from "v2/__generated__/ConfirmArtworkModal_artwork.graphql"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"
import { CollapsibleArtworkDetailsFragmentContainer } from "./CollapsibleArtworkDetails"

export interface ConfirmArtworkModalProps {
  artwork: ConfirmArtworkModal_artwork
  conversationID: string
  show: boolean
  closeModal: () => void
}

export const ConfirmArtworkModal: React.FC<ConfirmArtworkModalProps> = ({
  artwork,
  conversationID,
  show,
  closeModal,
}) => (
  <Modal
    show={show}
    onClose={closeModal}
    title="Confirm Artwork"
    FixedButton={
      <Flex flexGrow={1}>
        <Button variant="secondaryOutline" flexGrow={1} onClick={closeModal}>
          Cancel
        </Button>
        <Spacer m="20px" />
        <ConfirmArtworkButtonFragmentContainer
          artwork={artwork}
          conversationID={conversationID}
          editionSetID={null}
        />
      </Flex>
    }
  >
    <Text color="black60" variant="subtitle" mb="30px">
      Make sure the artwork below matches the intended work you’re making an
      offer on.
    </Text>

    <CollapsibleArtworkDetailsFragmentContainer artwork={artwork} />
    <Separator />

    <Message mt="20px" mx="20px">
      Making an offer doesn’t guarantee you the work, as the seller might be
      receiving competing offers.
    </Message>
  </Modal>
)

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
          editionOf
          isOfferableFromInquiry
          listPrice {
            ... on Money {
              display
            }
            ... on PriceRange {
              display
            }
          }
          dimensions {
            cm
            in
          }
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
      render={renderWithLoadProgress<ConfirmArtworkModalQueryResponse>(
        ({ artwork }) => (
          <ConfirmArtworkModalFragmentContainer artwork={artwork!} {...rest} />
        )
      )}
    />
  )
}
