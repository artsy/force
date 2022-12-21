import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useDislikeArtworkMutation } from "__generated__/useDislikeArtworkMutation.graphql"

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
