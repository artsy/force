import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateArtworkMutation } from "__generated__/useUpdateArtworkMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateArtwork = () => {
  return useMutation<useUpdateArtworkMutation>({
    mutation: graphql`
      mutation useUpdateArtworkMutation(
        $input: MyCollectionUpdateArtworkInput!
      ) {
        myCollectionUpdateArtwork(input: $input) {
          artworkOrError {
            ... on MyCollectionArtworkMutationSuccess {
              artwork {
                internalID
                images(includeAll: true) {
                  internalID
                }
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
