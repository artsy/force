import React, { useState } from "react"
import { CreateNewListModalContainer, NewAddedList } from "./CreateNewListModal"
import { AddArtworksModalContainer } from "./AddArtworksModal"

interface CreateNewListModalWizardProps {
  onComplete: () => void
  onClose: () => void
}

export const CreateNewListModalWizard: React.FC<CreateNewListModalWizardProps> = ({
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

  if (listName == null) {
    return (
      <CreateNewListModalContainer
        visible
        onClose={onClose}
        onComplete={handleCreateListComplete}
      />
    )
  }

  return (
    <>
      <AddArtworksModalContainer
        visible
        onClose={onComplete}
        onComplete={handleAddArtworksComplete}
        listName={listName}
      />
    </>
  )
}
