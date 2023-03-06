import React, { useState, useEffect } from "react"
// TODO: move directory up one level
import { CreateNewListModalContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
import { AddArtworksModalContainer } from "./AddArtworksModal"

interface CreateNewListModalWizardProps {
  modalIsOpened: boolean
  onComplete: () => void
}

export const CreateNewListModalWizard: React.FC<CreateNewListModalWizardProps> = ({
  modalIsOpened,
  onComplete,
}) => {
  const [displayModal, setDisplayModal] = useState(modalIsOpened)
  const [listName, setListName] = useState<string | null>(null)
  const [viewKey, setViewKey] = useState<
    "CreateListModal" | "AddArtworksModal"
  >("CreateListModal")

  useEffect(() => {
    setDisplayModal(modalIsOpened)
  }, [modalIsOpened])

  const handleCloseModal = () => {
    setDisplayModal(false)
    onComplete()
  }

  const handleCreateListComplete = listName => {
    setListName(listName)
    setViewKey("AddArtworksModal")
  }

  const handleAddArtworksComplete = () => {
    setDisplayModal(false)
    setViewKey("CreateListModal")
    onComplete()
  }

  return (
    <>
      {viewKey == "CreateListModal" && (
        <CreateNewListModalContainer
          visible={displayModal}
          onClose={handleCloseModal}
          onComplete={handleCreateListComplete}
        />
      )}

      {viewKey == "AddArtworksModal" && (
        <AddArtworksModalContainer
          visible={displayModal}
          onClose={handleCloseModal}
          onComplete={handleAddArtworksComplete}
          listName={listName ?? "Outdoor Sculptures"}
        />
      )}
    </>
  )
}
