import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateCollectionsForArtworkMutation } from "__generated__/useUpdateCollectionsForArtworkMutation.graphql"

interface Counts {
  custom: number
  default: number
}

export const useUpdateCollectionsForArtwork = (artworkID: string) => {
  return useMutation<useUpdateCollectionsForArtworkMutation>({
    mutation: graphql`
      mutation useUpdateCollectionsForArtworkMutation(
        $input: ArtworksCollectionsBatchUpdateInput!
      ) {
        artworksCollectionsBatchUpdate(input: $input) {
          responseOrError {
            ... on ArtworksCollectionsBatchUpdateSuccess {
              addedToCollections {
                internalID
                name
                artworksCount
              }
              removedFromCollections {
                internalID
                name
                artworksCount
              }
            }
            ... on ArtworksCollectionsBatchUpdateFailure {
              mutationError {
                statusCode
              }
            }
          }
        }
      }
    `,
    updater: (store, data) => {
      const artwork = store.get(artworkID)

      if (!artwork) {
        return
      }

      const response = data.artworksCollectionsBatchUpdate?.responseOrError
      const addedCounts = getCountsByLists(response?.addedToCollections as any)
      const removedCounts = getCountsByLists(
        response?.removedFromCollections as any
      )

      // Set `isSaved` field to `true` if artwork was saved in "All Saves"
      if (addedCounts.default > 0) {
        artwork.setValue(true, "isSaved")
      }

      // Set `isSaved` field to `false` if artwork was unsaved from "All Saves"
      if (removedCounts.default > 0) {
        artwork.setValue(false, "isSaved")
      }

      const entity = artwork.getLinkedRecord("collectionsConnection", {
        first: 0,
        default: false,
        saves: true,
      })

      if (!entity) {
        return
      }

      /**
       * Update `totalCount` field, based on which we decide
       * whether to display the manage lists for artwork modal or
       * immediately remove artwork from "All Saves"
       */
      const prevValue = (entity.getValue("totalCount") ?? 0) as number
      const newValue = prevValue + addedCounts.custom - removedCounts.custom

      entity.setValue(newValue, "totalCount")
    },
  })
}

const getCountsByLists = <T extends { name: string }>(lists: T[]) => {
  const defaultCounts: Counts = {
    custom: 0,
    default: 0,
  }

  return lists.reduce((acc, list) => {
    const isDefault = list.name === "Saved Artwork"
    const key: keyof Counts = isDefault ? "default" : "custom"
    const prevCount = acc[key]

    return {
      ...acc,
      [key]: prevCount + 1,
    }
  }, defaultCounts)
}
