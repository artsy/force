import { useState } from "react"
import {
  ContextualMenu,
  ContextualMenuDivider,
  ContextualMenuItem,
} from "Components/ContextualMenu"
import {
  DeleteSavesModal,
  DeleteSavesModalCollection,
} from "./DeleteSavesModal"
import { useTranslation } from "react-i18next"
import {
  EditSavesModal,
  EditSavesModalCollection,
} from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/EditSavesModal"

interface Props {
  collection: DeleteSavesModalCollection & EditSavesModalCollection
}

export const SavesContextualMenu: React.FC<Props> = ({ collection }) => {
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
        <EditSavesModal collection={collection} onClose={closeEditModal} />
      )}

      {isDeleteModalOpen && (
        <DeleteSavesModal collection={collection} onClose={closeDeleteModal} />
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
