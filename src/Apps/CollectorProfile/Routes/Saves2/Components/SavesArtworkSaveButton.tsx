import { SelectListsForArtworkModalQueryRender } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useState } from "react"

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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    console.log("[debug]", artworkId, collectionId)
    setVisible(true)
  }

  const handleCloseModal = () => {
    setVisible(false)
  }

  const handleSavedStatusChanged = (isSaved: boolean) => {
    setIsSaved(isSaved)
  }

  return (
    <>
      <SaveButtonBase isSaved={isSaved} onClick={handleClick} />

      {visible && (
        <SelectListsForArtworkModalQueryRender
          artworkID={artworkId}
          collectionId={collectionId}
          onClose={handleCloseModal}
          onSavedStatusChanged={handleSavedStatusChanged}
        />
      )}
    </>
  )
}
