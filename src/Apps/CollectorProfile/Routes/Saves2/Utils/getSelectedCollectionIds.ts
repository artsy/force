import { difference, uniq } from "lodash"

interface Options {
  preselectedCollectionIDs: string[]
  addToCollectionIDs: string[]
  removeFromCollectionIDs: string[]
}

export const getSelectedCollectionIds = (options: Options) => {
  const {
    preselectedCollectionIDs,
    addToCollectionIDs,
    removeFromCollectionIDs,
  } = options
  const selectedCollectionIds = difference(
    uniq([...preselectedCollectionIDs, ...addToCollectionIDs]),
    removeFromCollectionIDs
  )

  return selectedCollectionIds
}
