import { FC, useState } from "react"
import { CreateNewListModal, NewAddedList } from "./CreateNewListModal"
import { AddArtworksModalQueryRender } from "./AddArtworksModal"

interface CreateNewListModalWizardProps {
  onComplete: () => void
  onClose: () => void
}

export const CreateNewListModalWizard: FC<CreateNewListModalWizardProps> = ({
  onComplete,
  onClose,
}) => {
  const [listName, setListName] = useState<string | null>(null)

  const handleCreateListComplete = (list: NewAddedList) => {
    setListName(list.name)
  }

  const handleAddArtworksComplete = () => {
    onComplete()
  }

  if (listName !== null) {
    return (
      <AddArtworksModalQueryRender
        onClose={onComplete}
        onComplete={handleAddArtworksComplete}
        listName={listName}
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
