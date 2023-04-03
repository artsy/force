import { difference, uniq } from "lodash"

interface ArtworkListEntity {
  isSavedArtwork: boolean
  internalID: string
}

interface Options<T> {
  artworkLists: T[]
  addToArtworkListIDs: string[]
  removeFromArtowrkListIDs: string[]
}

export const getSelectedArtworkListIds = <T extends ArtworkListEntity>(
  options: Options<T>
) => {
  const {
    artworkLists,
    addToArtworkListIDs,
    removeFromArtowrkListIDs,
  } = options
  const selectedByDefault = artworkLists.filter(node => node.isSavedArtwork)
  const selectedIdsByDefault = selectedByDefault.map(node => node.internalID)
  const selectedArtworkListIds = difference(
    uniq([...selectedIdsByDefault, ...addToArtworkListIDs]),
    removeFromArtowrkListIDs
  )

  return selectedArtworkListIds
}
