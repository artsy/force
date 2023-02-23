import { createContext, useContext } from "react"

export interface ArtworkEntity {
  id: string
  title: string
  image: string | null
}

export interface ManageArtworkForCollectionsState {
  artwork: ArtworkEntity | null
  setArtwork: (artworkEntity: ArtworkEntity) => void
  clearArtwork: () => void
}

export const ManageArtworkForCollections = createContext<
  ManageArtworkForCollectionsState
>((null as unknown) as ManageArtworkForCollectionsState)

export const useManageArtworkForCollectionsContext = () => {
  return useContext(ManageArtworkForCollections)
}
