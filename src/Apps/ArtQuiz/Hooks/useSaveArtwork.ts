import { useMutation } from "Utils/Hooks/useMutation"
import type { useSaveArtworkMutation } from "__generated__/useSaveArtworkMutation.graphql"
import { graphql } from "react-relay"

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
