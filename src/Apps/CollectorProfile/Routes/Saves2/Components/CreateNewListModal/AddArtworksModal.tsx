import { FC, useState } from "react"
import { Flex, Text, ModalDialog, Button } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { AddArtworksModalContentQueryRender } from "./AddArtworksModalContent"

interface AddArtworksModalProps {
  onClose: () => void
  onComplete: () => void
  listName: string
}

export const AddArtworksModal: FC<AddArtworksModalProps> = ({
  listName,
  onClose,
}) => {
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])
  const { t } = useTranslation()

  const handleSave = () => {
    onClose()
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
      onClose={onClose}
      title={t("collectorSaves.addArtworksModal.modalTitle", {
        value: listName,
      })}
      footer={
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="sm-display">
            {t("collectorSaves.addArtworksModal.artworksSelected", {
              count: selectedArtworkIds.length,
            })}
          </Text>

          <Button onClick={handleSave}>{t("common.buttons.save")}</Button>
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
