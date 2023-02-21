import { difference, uniq } from "lodash"

interface CollectionNode {
  isSavedArtwork: boolean
  internalID: string
}

interface Options<T> {
  collections: T[]
  addToCollectionIDs: string[]
  removeFromCollectionIDs: string[]
}

export const getSelectedCollectionIds = <T extends CollectionNode>(
  options: Options<T>
) => {
  const { collections, addToCollectionIDs, removeFromCollectionIDs } = options
  const selectedByDefault = collections.filter(node => node.isSavedArtwork)
  const selectedIdsByDefault = selectedByDefault.map(node => node.internalID)
  const selectedCollectionIds = difference(
    uniq([...selectedIdsByDefault, ...addToCollectionIDs]),
    removeFromCollectionIDs
  )

  return selectedCollectionIds
}
