import { useAddArtworksToCollection } from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/useAddArtworksToCollection"
import createLogger from "Utils/logger"

import {
  ActionType,
  type AddedArtworkToArtworkList,
  OwnerType,
} from "@artsy/cohesion"
import { Button, Flex, ModalDialog, Text, useToasts } from "@artsy/palette"
import { type FC, useState } from "react"
import { useTracking } from "react-tracking"
import { AddArtworksModalContentQueryRender } from "./AddArtworksModalContent"
import type { ArtworkList } from "./CreateNewListModal"

interface AddArtworksModalProps {
  onComplete: () => void
  artworkList: ArtworkList
}

const logger = createLogger("AddArtworksModal")

export const AddArtworksModal: FC<
  React.PropsWithChildren<AddArtworksModalProps>
> = ({ artworkList, onComplete }) => {
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])

  const { sendToast } = useToasts()
  const { submitMutation } = useAddArtworksToCollection()
  const { trackEvent } = useTracking()
  const [isSaving, setIsSaving] = useState(false)

  const trackAnalyticEvent = () => {
    const event: AddedArtworkToArtworkList = {
      action: ActionType.addedArtworkToArtworkList,
      context_owner_type: OwnerType.saves,
      artwork_ids: selectedArtworkIds,
      owner_ids: [artworkList.internalID],
    }

    trackEvent(event)
  }

  const handleSave = async () => {
    if (selectedArtworkIds.length === 0) {
      onComplete()
      return
    }

    try {
      setIsSaving(true)

      await submitMutation({
        variables: {
          input: {
            artworkIDs: selectedArtworkIds,
            addToCollectionIDs: [artworkList.internalID],
          },
        },
        rejectIf: res => {
          const result = res.artworksCollectionsBatchUpdate
          const error = result?.responseOrError

          return !!error?.mutationError
        },
      })

      if (selectedArtworkIds.length > 0) {
        trackAnalyticEvent()
      }

      onComplete()
    } catch (error) {
      logger.error(error)

      sendToast({
        variant: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleArtworkClick = (artworkID: string) => {
    if (selectedArtworkIds.includes(artworkID)) {
      setSelectedArtworkIds(selectedArtworkIds.filter(id => id !== artworkID))
    } else {
      setSelectedArtworkIds([...selectedArtworkIds, artworkID])
    }
  }

  return (
    <ModalDialog
      m={[0, 2]}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "auto"],
        maxHeight: [null, 800],
      }}
      onClose={onComplete}
      title={`${artworkList.name} created. Add saved works to the list.`}
      footer={
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="sm-display">
            {selectedArtworkIds.length === 1
              ? `${selectedArtworkIds.length} artwork selected`
              : `${selectedArtworkIds.length} artworks selected`}
          </Text>

          <Button
            onClick={handleSave}
            loading={isSaving}
            data-testid="artwork-list-modal-save"
          >
            Save
          </Button>
        </Flex>
      }
    >
      <AddArtworksModalContentQueryRender
        selectedArtworkIds={selectedArtworkIds}
        onArtworkClick={handleArtworkClick}
      />
    </ModalDialog>
  )
}
