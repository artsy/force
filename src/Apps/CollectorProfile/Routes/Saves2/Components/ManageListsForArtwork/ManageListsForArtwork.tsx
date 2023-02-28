import { FC } from "react"
import { ManageListsForArtworkProvider } from "Apps/CollectorProfile/Routes/Saves2/Components/ManageListsForArtwork/ManageListsForArtworkProvider"
import { ManageListsForArtworkContent } from "Apps/CollectorProfile/Routes/Saves2/Components/ManageListsForArtwork/ManageListsForArtworkContent"

interface ManageListsForArtworkProps {
  onClose: () => void
  onSave: (collectionIds: string[]) => void
}

export const ManageListsForArtwork: FC<ManageListsForArtworkProps> = ({
  onClose,
  onSave,
}) => {
  return (
    <ManageListsForArtworkProvider onClose={onClose} onSave={onSave}>
      <ManageListsForArtworkContent />
    </ManageListsForArtworkProvider>
  )
}
