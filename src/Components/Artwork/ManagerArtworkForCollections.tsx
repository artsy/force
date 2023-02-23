import { createContext, useContext } from "react"

export interface ArtworkEntity {
  id: string
  title: string
  image: string | null
}

export interface ManagerArtworkForCollectionsState {
  artwork: ArtworkEntity | null
  setArtwork: (artworkEntity: ArtworkEntity) => void
  clearArtwork: () => void
}

export const ManagerArtworkForCollections = createContext<
  ManagerArtworkForCollectionsState
>((null as unknown) as ManagerArtworkForCollectionsState)

export const useManagerArtworkForCollectionsContext = () => {
  return useContext(ManagerArtworkForCollections)
}
