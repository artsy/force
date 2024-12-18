import { type Environment, commitMutation, graphql } from "react-relay"
import type {
  SaveArtworkMutation,
  SaveArtworkInput,
  SaveArtworkMutation$data,
} from "__generated__/SaveArtworkMutation.graphql"

export const SaveArtwork = (
  environment: Environment,
  input: SaveArtworkInput,
  optimisticResponse: SaveArtworkMutation$data
) => {
  return new Promise<SaveArtworkMutation$data>(async (resolve, reject) => {
    commitMutation<SaveArtworkMutation>(environment, {
      mutation: graphql`
        mutation SaveArtworkMutation($input: SaveArtworkInput!)
          @raw_response_type {
          saveArtwork(input: $input) {
            artwork {
              id
              slug
              isSavedToAnyList
              collectorSignals {
                auction {
                  lotWatcherCount
                }
              }
            }
            me {
              id
              counts {
                savedArtworks
              }
            }
          }
        }
      `,
      onCompleted: resolve,
      onError: reject,
      variables: {
        input,
      },
      optimisticResponse,
    })
  })
}
