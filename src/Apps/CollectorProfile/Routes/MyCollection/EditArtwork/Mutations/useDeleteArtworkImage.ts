import { useMutation } from "Utils/Hooks/useMutation"
import type { useDeleteArtworkImageMutation } from "__generated__/useDeleteArtworkImageMutation.graphql"
import { graphql } from "react-relay"

export const useDeleteArtworkImage = () => {
  return useMutation<useDeleteArtworkImageMutation>({
    mutation: graphql`
      mutation useDeleteArtworkImageMutation($input: DeleteArtworkImageInput!) {
        deleteArtworkImage(input: $input) {
          artworkOrError {
            ... on ArtworkMutationDeleteSuccess {
              success
            }
            ... on ArtworkMutationFailure {
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
