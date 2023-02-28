import { ManageListsForArtwork } from "Apps/CollectorProfile/Routes/Saves2/Components/ManageListsForArtwork/ManageListsForArtwork"
import { createContext, FC, useContext, useMemo, useState } from "react"

export interface ManageArtworkForSavesState {
  artworkId: string | null
  savedListId?: string
  isSavedToList: boolean
  setArtworkId: (artworkId: string) => void
  clearArtworkId: () => void
}

interface ProviderProps {
  savedListId?: string
}

export const ManageArtworkForSaves = createContext<ManageArtworkForSavesState>(
  (null as unknown) as ManageArtworkForSavesState
)

export const useManageArtworkForSavesContext = () => {
  return useContext(ManageArtworkForSaves)
}

/**
 *
 * If `savedListId` was passed, it means the user is on the saves page
 * In this case, whether the artwork is saved or not will depend on the local state (not on the status received from backend)
 *
 * https://artsy.net/collector-profile/saves2
 */
export const ManageArtworkForSavesProvider: FC<ProviderProps> = ({
  children,
  savedListId,
}) => {
  const [artworkEntityId, setArtworkEntityId] = useState<string | null>(null)
  const [isSavedToList, setIsSavedToList] = useState(!!savedListId)

  const setArtworkId = (artworkId: string) => {
    setArtworkEntityId(artworkId)
  }

  const clearArtworkId = () => {
    setArtworkEntityId(null)
  }

  // TODO: Pass onClose, onSave
  const value: ManageArtworkForSavesState = useMemo(
    () => ({
      artworkId: artworkEntityId,
      savedListId,
      isSavedToList,
      setArtworkId,
      clearArtworkId,
    }),
    [artworkEntityId, savedListId, isSavedToList]
  )

  const handleSaveListsForArtwork = (listIds: string[]) => {
    if (savedListId) {
      setIsSavedToList(listIds.includes(savedListId))
    }
  }

  return (
    <ManageArtworkForSaves.Provider value={value}>
      {children}

      {!!artworkEntityId && (
        <ManageListsForArtwork
          onClose={clearArtworkId}
          onSave={handleSaveListsForArtwork}
        />
      )}
    </ManageArtworkForSaves.Provider>
  )
}
