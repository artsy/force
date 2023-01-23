import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useCreateArtworkMutation } from "__generated__/useCreateArtworkMutation.graphql"

export const useCreateArtwork = () => {
  return useMutation<useCreateArtworkMutation>({
    mutation: graphql`
      mutation useCreateArtworkMutation(
        $input: MyCollectionCreateArtworkInput!
      ) {
        myCollectionCreateArtwork(input: $input) {
          artworkOrError {
            ... on MyCollectionArtworkMutationSuccess {
              artworkEdge {
                __id
                node {
                  internalID
                  images(includeAll: true) {
                    internalID
                  }
                }
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
