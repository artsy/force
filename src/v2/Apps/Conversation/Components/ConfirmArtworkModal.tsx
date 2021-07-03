import {
  Button,
  Flex,
  Message,
  Modal,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import React, { useState } from "react"
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
import { EditionSelectBoxFragmentContainer } from "./EditionSelectBox"
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
}) => {
  const { editionSets, isEdition } = { ...artwork }

  const initialSelectedEdition =
    editionSets?.length === 1 ? editionSets[0]!.internalID : null

  const [selectedEdition, setSelectedEdition] = useState<string | null>(
    initialSelectedEdition
  )

  const selectEdition = (editionSetID: string, isAvailable?: boolean) => {
    if (isAvailable) {
      setSelectedEdition(editionSetID)
    }
  }

  return (
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
            disabled={!!isEdition && !selectedEdition}
            conversationID={conversationID}
            editionSetID={selectedEdition || null}
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
      {!!isEdition && editionSets?.length && (
        <Flex flexDirection="column">
          <Text mx={2} mt={2} mb={1}>
            Which edition are you interested in?
          </Text>
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
      <Message mt="20px" mx="20px">
        Making an offer doesn’t guarantee you the work, as the seller might be
        receiving competing offers.
      </Message>
    </Modal>
  )
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
