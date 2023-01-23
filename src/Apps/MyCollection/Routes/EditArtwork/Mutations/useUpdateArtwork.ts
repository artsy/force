import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateArtworkMutation } from "__generated__/useUpdateArtworkMutation.graphql"

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
