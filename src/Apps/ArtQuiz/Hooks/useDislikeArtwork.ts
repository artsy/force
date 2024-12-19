import { useMutation } from "Utils/Hooks/useMutation"
import type { useDislikeArtworkMutation } from "__generated__/useDislikeArtworkMutation.graphql"
import { graphql } from "react-relay"

export const useDislikeArtwork = () => {
  return useMutation<useDislikeArtworkMutation>({
    mutation: graphql`
      mutation useDislikeArtworkMutation($input: DislikeArtworkInput!) {
        dislikeArtwork(input: $input) {
          artwork {
            isDisliked
          }
        }
      }
    `,
  })
}
