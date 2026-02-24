import difference from "lodash/difference"
import uniq from "lodash/uniq"
interface ArtworkListEntity {
  isSavedArtwork: boolean
  internalID: string
}

interface Options<T> {
  artworkLists: T[]
  addToArtworkListIDs: string[]
  removeFromArtworkListIDs: string[]
}

export const getSelectedArtworkListIds = <T extends ArtworkListEntity>(
  options: Options<T>,
) => {
  const { artworkLists, addToArtworkListIDs, removeFromArtworkListIDs } =
    options
  const selectedByDefault = artworkLists.filter(node => node.isSavedArtwork)
  const selectedIdsByDefault = selectedByDefault.map(node => node.internalID)
  const selectedArtworkListIds = difference(
    uniq([...selectedIdsByDefault, ...addToArtworkListIDs]),
    removeFromArtworkListIDs,
  )

  return selectedArtworkListIds
}
