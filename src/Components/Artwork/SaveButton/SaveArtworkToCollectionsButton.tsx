import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"

export const SaveArtworkToCollectionsButton = () => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
  }

  return <SaveButtonBase isSaved={true} onClick={handleClick} />
}
