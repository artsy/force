import {
  ContextualMenu,
  ContextualMenuItemButton,
} from "Components/ContextualMenu"
import { useState } from "react"
import {
  type DeleteArtworkListEntity,
  DeleteArtworkListModal,
} from "./DeleteArtworkListModal"

import {
  type EditArtworkListEntity,
  EditArtworkListModal,
} from "Apps/CollectorProfile/Routes/Saves/Components/Actions/EditArtworkListModal"

// FIXME: Should be a fragment
export type ArtworkListEntity = DeleteArtworkListEntity & EditArtworkListEntity

interface ArtworkListContextualMenuProps {
  artworkList: ArtworkListEntity
}

export const ArtworkListContextualMenu: React.FC<
  React.PropsWithChildren<ArtworkListContextualMenuProps>
> = ({ artworkList }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const openEditModal = () => {
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      {isEditModalOpen && (
        <EditArtworkListModal
          artworkList={artworkList}
          onClose={closeEditModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteArtworkListModal
          artworkList={artworkList}
          onClose={closeDeleteModal}
        />
      )}

      <ContextualMenu>
        <ContextualMenuItemButton onClick={openEditModal}>
          Edit List
        </ContextualMenuItemButton>

        <ContextualMenuItemButton onClick={openDeleteModal}>
          Delete List
        </ContextualMenuItemButton>
      </ContextualMenu>
    </>
  )
}
