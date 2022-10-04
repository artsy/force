import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useDeleteArtworkMutation } from "__generated__/useDeleteArtworkMutation.graphql"

export const useDeleteArtwork = () => {
  return useMutation<useDeleteArtworkMutation>({
    mutation: graphql`
      mutation useDeleteArtworkMutation(
        $input: MyCollectionDeleteArtworkInput!
      ) {
        myCollectionDeleteArtwork(input: $input) {
          artworkOrError {
            ... on MyCollectionArtworkMutationSuccess {
              artwork {
                internalID
              }
            }
            ... on MyCollectionArtworkMutationFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })
}
