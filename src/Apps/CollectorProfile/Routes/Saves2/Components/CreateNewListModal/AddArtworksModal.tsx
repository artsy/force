import React from "react"
import { Flex, Text, ModalDialog, Spacer, Button } from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { ArtworksList, TEMP_ARTWORKS } from "./ArtworksList"
import { useTranslation } from "react-i18next"

interface AddArtworksModalProps {
  visible: boolean
  onClose: () => void
  onComplete: () => void
  listName: string
}

const AddArtworksModal: React.FC<AddArtworksModalProps> = ({
  listName,
  onClose,
}) => {
  const { t } = useTranslation()

  const handleSave = () => {
    onClose()
  }

  return (
    <ModalDialog
      m={["0", "auto"]}
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
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text variant={"sm"}>
            {t("collectorSaves.addArtworksModal.artworksSelected", {
              count: 0,
            })}
          </Text>

          <Button onClick={handleSave}>{t("general.buttons.save")}</Button>
        </Flex>
      }
    >
      <>
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <b>
            <Text variant={["xs", "sm"]}>
              {t("collectorSaves.addArtworksModal.artworksCount", {
                count: TEMP_ARTWORKS.length,
              })}
            </Text>
          </b>

          <SortFilter
            sortOptions={[{ text: "Recently Saved", value: "-position" }]}
            selected={"-position"}
            onSort={() => {}}
          />
        </Flex>

        <Spacer y={2} />

        <ArtworksList />
      </>
    </ModalDialog>
  )
}

export const AddArtworksModalContainer: React.FC<AddArtworksModalProps> = props => {
  const { visible } = props

  if (!visible) return null

  return <AddArtworksModal {...props} />
}
