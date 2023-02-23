import { useToasts } from "@artsy/palette"
import { SelectListsForArtworkModalQueryRender } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface SavesArtworkSaveButtonProps {
  artworkId: string
  collectionId: string
}

export const SavesArtworkSaveButton: React.FC<SavesArtworkSaveButtonProps> = ({
  artworkId,
  collectionId,
}) => {
  const [visible, setVisible] = useState(false)
  const [isSaved, setIsSaved] = useState(true)

  const { sendToast } = useToasts()
  const { t } = useTranslation()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    setVisible(true)
  }

  const handleCloseModal = () => {
    setVisible(false)
  }

  const handleSave = (selectedCollectionIds: string[]) => {
    const isSavedForCurrentCollection = selectedCollectionIds.includes(
      collectionId
    )

    setIsSaved(isSavedForCurrentCollection)
    sendToast({
      variant: "success",
      message: t("collectorSaves.saveArtworkToListsButton.changesSaved"),
    })
  }

  return (
    <>
      <SaveButtonBase isSaved={isSaved} onClick={handleClick} />

      {visible && (
        <SelectListsForArtworkModalQueryRender
          artworkID={artworkId}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  )
}
