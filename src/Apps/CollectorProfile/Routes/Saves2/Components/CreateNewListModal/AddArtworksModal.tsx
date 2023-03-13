import { FC, useState } from "react"
import { Flex, Text, ModalDialog, Spacer, Button } from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { ArtworksList, TEMP_ARTWORKS } from "./ArtworksList"
import { useTranslation } from "react-i18next"

interface AddArtworksModalProps {
  onClose: () => void
  onComplete: () => void
  listName: string
}

const SORTS = [{ text: "Recently Saved", value: "-position" }]

export const AddArtworksModal: FC<AddArtworksModalProps> = ({
  listName,
  onClose,
}) => {
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])
  const { t } = useTranslation()

  const handleSave = () => {
    onClose()
  }

  const handleItemClick = artworkID => {
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
      <>
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant={["xs", "sm"]} fontWeight="bold">
            {t("collectorSaves.addArtworksModal.artworksCount", {
              count: TEMP_ARTWORKS.length,
            })}
          </Text>

          <SortFilter
            sortOptions={SORTS}
            selected={SORTS[0].value}
            onSort={() => {}}
          />
        </Flex>

        <Spacer y={2} />

        <ArtworksList
          selectedIds={selectedArtworkIds}
          onItemClick={handleItemClick}
        />
      </>
    </ModalDialog>
  )
}
