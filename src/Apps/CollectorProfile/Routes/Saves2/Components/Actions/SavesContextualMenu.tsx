import { useState } from "react"
import {
  ContextualMenu,
  ContextualMenuDivider,
  ContextualMenuItem,
} from "Components/ContextualMenu"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"
import { DeleteSavesModal } from "./DeleteSavesModal"
import { useTranslation } from "react-i18next"
import { EditSavesModal } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/EditSavesModal"

interface Props {
  collection: SavesArtworks_collection$data
}

export const SavesContextualMenu: React.FC<Props> = ({ collection }) => {
  const { t } = useTranslation()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditList = () => {
    setIsEditModalOpen(true)
  }

  const handleDeleteList = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteSavesModal
          collection={collection}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      {isEditModalOpen && (
        <EditSavesModal
          collection={collection}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}

      <ContextualMenu>
        <ContextualMenuItem onClick={handleEditList}>
          {t("collectorSaves.contextualMenu.edit")}
        </ContextualMenuItem>

        <ContextualMenuDivider />

        <ContextualMenuItem onClick={handleDeleteList}>
          {t("collectorSaves.contextualMenu.delete")}
        </ContextualMenuItem>
      </ContextualMenu>
    </>
  )
}
