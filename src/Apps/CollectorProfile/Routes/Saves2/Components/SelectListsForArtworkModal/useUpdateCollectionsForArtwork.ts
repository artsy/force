import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateCollectionsForArtworkMutation } from "__generated__/useUpdateCollectionsForArtworkMutation.graphql"

export const useUpdateCollectionsForArtwork = () => {
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
                artworks
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
  })
}
