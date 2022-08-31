import { graphql } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"
import { useDeleteArtworkImageMutation } from "__generated__/useDeleteArtworkImageMutation.graphql"

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
