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
  const [isSaved, setIsSaved] = useState(true)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsSaved(!isSaved)

    // TODO: Display modal window with collections
    console.log("[debug]", artworkId, collectionId)
  }

  return <SaveButtonBase isSaved={isSaved} onClick={handleClick} />
}
