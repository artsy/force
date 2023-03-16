import { FC, useState } from "react"
import { CreateNewListModal, ArtworkList } from "./CreateNewListModal"
import { AddArtworksModal } from "./AddArtworksModal"

export interface CreateNewListModalWizardProps {
  onComplete: (artworkList: ArtworkList) => void
  onClose: () => void
}

export const CreateNewListModalWizard: FC<CreateNewListModalWizardProps> = ({
  onComplete,
  onClose,
}) => {
  const [artworkList, setArtworkList] = useState<ArtworkList | null>(null)

  const handleCreateListComplete = (list: ArtworkList) => {
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
