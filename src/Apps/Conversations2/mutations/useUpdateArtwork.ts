import { graphql, useMutation } from "react-relay"
import { useUpdateArtworkMutation } from "__generated__/useUpdateArtworkMutation.graphql"

export const useUpdateArtwork = () => {
  return useMutation<useUpdateArtworkMutation>(graphql`
    mutation useUpdateArtworkMutation($input: UpdateArtworkMutationInput!) {
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
