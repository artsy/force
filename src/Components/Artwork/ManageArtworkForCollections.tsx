import { createContext, useContext } from "react"

export interface ManageArtworkForCollectionsState {
  artworkId: string | null
  isSavedToList: boolean | null
  setArtworkId: (artworkId: string) => void
  clearArtworkId: () => void
}

export const ManageArtworkForCollections = createContext<
  ManageArtworkForCollectionsState
>((null as unknown) as ManageArtworkForCollectionsState)

export const useManageArtworkForCollectionsContext = () => {
  return useContext(ManageArtworkForCollections)
}
