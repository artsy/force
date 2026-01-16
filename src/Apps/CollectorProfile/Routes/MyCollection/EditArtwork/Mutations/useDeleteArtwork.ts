import { useMutation } from "Utils/Hooks/useMutation"
import type { useDeleteArtworkMutation } from "__generated__/useDeleteArtworkMutation.graphql"
import { graphql } from "react-relay"

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
