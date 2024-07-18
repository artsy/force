import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useUpdateMyCollectionArtworkMutation } from "__generated__/useUpdateMyCollectionArtworkMutation.graphql"

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
