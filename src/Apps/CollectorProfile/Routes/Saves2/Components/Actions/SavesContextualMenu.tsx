import { useState } from "react"
import {
  ContextualMenu,
  ContextualMenuDivider,
  ContextualMenuItem,
} from "Components/ContextualMenu"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"
import { DeleteSavesModal } from "./DeleteSavesModal"
import { useTranslation } from "react-i18next"

interface Props {
  collection: SavesArtworks_collection$data
}

export const SavesContextualMenu: React.FC<Props> = ({ collection }) => {
  const { t } = useTranslation()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleEditList = () => {
    alert("Unimplemented — see FX-4552")
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
