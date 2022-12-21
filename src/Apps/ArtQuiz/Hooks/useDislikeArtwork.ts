import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useDeleteArtworkMutation } from "__generated__/useDeleteArtworkMutation.graphql"

export const useDislikeArtwork = () => {
  return useMutation<useDeleteArtworkMutation>({
    mutation: graphql`
      mutation useDislikeArtworkMutation($input: DislikeArtworkInput!)
        @raw_response_type {
        dislikeArtwork(input: $input) {
          artwork {
            id
            slug
            isDisliked
          }
        }
      }
    `,
  })
}
