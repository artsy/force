import { SelectListsForArtworkModal } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"
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

  return (
    <>
      <SaveButtonBase isSaved onClick={handleClick} />

      {visible && <SelectListsForArtworkModal onClose={handleCloseModal} />}
    </>
  )
}
