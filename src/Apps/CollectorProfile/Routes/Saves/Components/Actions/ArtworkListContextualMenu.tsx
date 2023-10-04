import { useState } from "react"
import {
  ContextualMenu,
  ContextualMenuDivider,
  ContextualMenuItem,
} from "Components/ContextualMenu"
import {
  DeleteArtworkListModal,
  DeleteArtworkListEntity,
} from "./DeleteArtworkListModal"
import { useTranslation } from "react-i18next"
import {
  EditArtworkListModal,
  EditArtworkListEntity,
} from "Apps/CollectorProfile/Routes/Saves/Components/Actions/EditArtworkListModal"

export type ArtworkListEntity = DeleteArtworkListEntity & EditArtworkListEntity

interface ArtworkListContextualMenuProps {
  artworkList: ArtworkListEntity
}

export const ArtworkListContextualMenu: React.FC<ArtworkListContextualMenuProps> = ({
  artworkList,
}) => {
  const { t } = useTranslation()

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
        <ContextualMenuItem onClick={openEditModal}>
          {t("collectorSaves.contextualMenu.edit")}
        </ContextualMenuItem>

        <ContextualMenuDivider />

        <ContextualMenuItem onClick={openDeleteModal}>
          {t("collectorSaves.contextualMenu.delete")}
        </ContextualMenuItem>
      </ContextualMenu>
    </>
  )
}
