import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateCollectionsForArtworkMutation } from "__generated__/useUpdateCollectionsForArtworkMutation.graphql"

export const useUpdateCollectionsForArtwork = (artworkID: string) => {
  return useMutation<useUpdateCollectionsForArtworkMutation>({
    mutation: graphql`
      mutation useUpdateCollectionsForArtworkMutation(
        $input: ArtworksCollectionsBatchUpdateInput!
      ) {
        artworksCollectionsBatchUpdate(input: $input) {
          responseOrError {
            ... on ArtworksCollectionsBatchUpdateSuccess {
              counts {
                addedToCollections
                removedFromCollections
              }

              addedToCollections {
                internalID
                artworksCount
              }
              removedFromCollections {
                internalID
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
      const response = data.artworksCollectionsBatchUpdate?.responseOrError
      const counts = response?.counts
      const addedCounts = counts?.addedToCollections ?? 0
      const removedCounts = counts?.removedFromCollections ?? 0
      const artwork = store.get(artworkID)

      const entity = artwork?.getLinkedRecord("collectionsConnection", {
        first: 0,
        default: false,
        saves: true,
      })

      if (!entity) {
        return
      }

      const prevValue = (entity.getValue("totalCount") ?? 0) as number
      const newValue = prevValue + addedCounts - removedCounts

      entity.setValue(newValue, "totalCount")
    },
  })
}
