import { useState } from "react"
import {
  ContextualMenu,
  ContextualMenuDivider,
  ContextualMenuItem,
} from "Components/ContextualMenu"
import { DeleteSavesModal, DeleteArtworkListEntity } from "./DeleteSavesModal"
import { useTranslation } from "react-i18next"
import {
  EditSavesModal,
  EditSavesModalCollection,
} from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/EditSavesModal"

export type ArtworkListEntity = DeleteArtworkListEntity &
  EditSavesModalCollection

interface Props {
  artworkList: ArtworkListEntity
}

export const SavesContextualMenu: React.FC<Props> = ({ artworkList }) => {
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
        <EditSavesModal collection={artworkList} onClose={closeEditModal} />
      )}

      {isDeleteModalOpen && (
        <DeleteSavesModal
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
