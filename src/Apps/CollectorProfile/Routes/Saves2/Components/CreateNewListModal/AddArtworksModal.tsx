import { FC, useState } from "react"
import { Flex, Text, ModalDialog, Button, useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { AddArtworksModalContentQueryRender } from "./AddArtworksModalContent"
import { useAddArtworksToCollection } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/useAddArtworksToCollection"
import createLogger from "Utils/logger"
import { ArtworkList } from "./CreateNewListModal"

interface AddArtworksModalProps {
  onComplete: () => void
  artworkList: ArtworkList
}

const logger = createLogger("AddArtworksModal")

export const AddArtworksModal: FC<AddArtworksModalProps> = ({
  artworkList,
  onComplete,
}) => {
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const { submitMutation } = useAddArtworksToCollection()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
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

      onComplete()
    } catch (error) {
      logger.error(error)

      sendToast({
        variant: "error",
        message: t("common.errors.somethingWentWrong"),
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
      m={0}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "auto"],
        maxHeight: [null, 800],
      }}
      onClose={onComplete}
      title={t("collectorSaves.addArtworksModal.modalTitle", {
        value: artworkList.name,
      })}
      footer={
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="sm-display">
            {t("collectorSaves.addArtworksModal.artworksSelected", {
              count: selectedArtworkIds.length,
            })}
          </Text>

          <Button onClick={handleSave} loading={isSaving}>
            {t("common.buttons.save")}
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
