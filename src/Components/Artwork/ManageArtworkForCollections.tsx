import { SelectListsForArtworkModalQueryRender } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"
import { createContext, FC, useContext, useMemo, useState } from "react"

export interface ManageArtworkForCollectionsState {
  artworkId: string | null
  savedListId?: string
  isSavedToList: boolean
  setArtworkId: (artworkId: string) => void
  clearArtworkId: () => void
}

interface ProviderProps {
  savedListId?: string
}

export const ManageArtworkForCollections = createContext<
  ManageArtworkForCollectionsState
>((null as unknown) as ManageArtworkForCollectionsState)

export const useManageArtworkForCollectionsContext = () => {
  return useContext(ManageArtworkForCollections)
}

export const ManageArtworkForCollectionsProvider: FC<ProviderProps> = ({
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

  const value: ManageArtworkForCollectionsState = useMemo(
    () => ({
      artworkId: artworkEntityId,
      savedListId,
      isSavedToList,
      setArtworkId,
      clearArtworkId,
    }),
    [artworkEntityId, savedListId, isSavedToList]
  )

  const handleSaveCollectionsForArtwork = (listIds: string[]) => {
    if (savedListId) {
      setIsSavedToList(listIds.includes(savedListId))
    }
  }

  return (
    <>
      <ManageArtworkForCollections.Provider value={value}>
        {children}
      </ManageArtworkForCollections.Provider>

      {!!artworkEntityId && (
        <SelectListsForArtworkModalQueryRender
          artworkID={artworkEntityId}
          onClose={clearArtworkId}
          onSave={handleSaveCollectionsForArtwork}
        />
      )}
    </>
  )
}
