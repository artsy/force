import { FC, useState } from "react"
import { CreateNewListModal, ArtworkList } from "./CreateNewListModal"
import { AddArtworksModal } from "./AddArtworksModal"

export interface CreateNewListModalWizardProps {
  onComplete: (artworkList: ArtworkList) => void
  onClose: () => void
  savedArtworksCount: number
}

export const CreateNewListModalWizard: FC<CreateNewListModalWizardProps> = ({
  onComplete,
  onClose,
  savedArtworksCount,
}) => {
  const [artworkList, setArtworkList] = useState<ArtworkList | null>(null)

  const handleCreateListComplete = (list: ArtworkList) => {
    if (savedArtworksCount === 0) {
      onComplete(list)
      return
    }

    setArtworkList(list)
  }

  const handleAddArtworksComplete = () => {
    onComplete(artworkList!)
  }

  if (artworkList !== null) {
    return (
      <AddArtworksModal
        onComplete={handleAddArtworksComplete}
        artworkList={artworkList}
      />
    )
  }

  return (
    <CreateNewListModal
      onClose={onClose}
      onComplete={handleCreateListComplete}
    />
  )
}
