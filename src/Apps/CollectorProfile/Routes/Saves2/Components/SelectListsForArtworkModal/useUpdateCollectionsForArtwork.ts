import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  useUpdateCollectionsForArtworkMutation,
  useUpdateCollectionsForArtworkMutation$data,
} from "__generated__/useUpdateCollectionsForArtworkMutation.graphql"

interface Counts {
  custom: number
  default: number
}

type Response = NonNullable<
  NonNullable<
    NonNullable<
      useUpdateCollectionsForArtworkMutation$data
    >["artworksCollectionsBatchUpdate"]
  >["responseOrError"]
>
type ListEntity =
  | Response["addedToCollections"]
  | Response["removedFromCollections"]

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
                default
                ...SavesItem_item
              }
              removedFromCollections {
                internalID
                default
                ...SavesItem_item
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
      const addedCounts = getCountsByLists(response?.addedToCollections)
      const removedCounts = getCountsByLists(response?.removedFromCollections)

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

const getCountsByLists = (lists: ListEntity) => {
  const listEntities = lists ?? []
  const defaultCounts: Counts = {
    custom: 0,
    default: 0,
  }

  return listEntities.reduce((acc, list) => {
    if (!list) {
      return acc
    }

    const key: keyof Counts = list.default ? "default" : "custom"
    const prevCount = acc[key]

    return {
      ...acc,
      [key]: prevCount + 1,
    }
  }, defaultCounts)
}
