import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useSaveArtworkMutation } from "__generated__/useSaveArtworkMutation.graphql"

export const useSaveArtwork = () => {
  return useMutation<useSaveArtworkMutation>({
    mutation: graphql`
      mutation useSaveArtworkMutation($input: SaveArtworkInput!) {
        saveArtwork(input: $input) {
          artwork {
            isSaved
          }
        }
      }
    `,
  })
}
