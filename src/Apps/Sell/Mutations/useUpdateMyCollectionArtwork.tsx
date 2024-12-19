import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateMyCollectionArtworkMutation } from "__generated__/useUpdateMyCollectionArtworkMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateMyCollectionArtwork = () => {
  return useMutation<useUpdateMyCollectionArtworkMutation>({
    mutation: graphql`
      mutation useUpdateMyCollectionArtworkMutation(
        $input: MyCollectionUpdateArtworkInput!
      ) {
        myCollectionUpdateArtwork(input: $input) {
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
