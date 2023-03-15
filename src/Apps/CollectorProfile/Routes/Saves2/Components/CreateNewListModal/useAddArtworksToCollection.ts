import { useMutation } from "Utils/Hooks/useMutation"
import { useAddArtworksToCollectionMutation } from "__generated__/useAddArtworksToCollectionMutation.graphql"
import { graphql } from "react-relay"

export const useAddArtworksToCollection = () => {
  return useMutation<useAddArtworksToCollectionMutation>({
    mutation: graphql`
      mutation useAddArtworksToCollectionMutation(
        $input: ArtworksCollectionsBatchUpdateInput!
      ) {
        artworksCollectionsBatchUpdate(input: $input) {
          responseOrError {
            ... on ArtworksCollectionsBatchUpdateSuccess {
              addedToCollections {
                internalID
                artworksCount
                default

                artworksConnection(first: 4) {
                  edges {
                    node {
                      image {
                        url(version: "square")
                      }
                    }
                  }
                }
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
