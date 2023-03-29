import { graphql, useMutation } from "react-relay"
import { useUpdateArtworkConversationMutation } from "__generated__/useUpdateArtworkConversationMutation.graphql"

export const useUpdateArtwork = () => {
  return useMutation<useUpdateArtworkConversationMutation>(graphql`
    mutation useUpdateArtworkConversationMutation(
      $input: UpdateArtworkMutationInput!
    ) {
      updateArtwork(input: $input) {
        artworkOrError {
          ... on updateArtworkSuccess {
            artwork {
              internalID
            }
          }
          ... on updateArtworkFailure {
            mutationError {
              message
            }
          }
        }
      }
    }
  `)
}
