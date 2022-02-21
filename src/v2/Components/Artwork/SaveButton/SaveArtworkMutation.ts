import { Environment, commitMutation, graphql } from "react-relay"
import {
  SaveArtworkMutation,
  SaveArtworkInput,
  SaveArtworkMutation$data,
} from "v2/__generated__/SaveArtworkMutation.graphql"

export const SaveArtwork = (
  environment: Environment,
  input: SaveArtworkInput,
  optimisticResponse: SaveArtworkMutation$data
) => {
  return new Promise<SaveArtworkMutation$data>(async (resolve, reject) => {
    commitMutation<SaveArtworkMutation>(environment, {
      mutation: graphql`
        mutation SaveArtworkMutation($input: SaveArtworkInput!) {
          saveArtwork(input: $input) {
            artwork {
              id
              slug
              is_saved: isSaved
            }
          }
        }
      `,
      onCompleted: resolve,
      onError: reject,
      variables: {
        input,
      },
      // @ts-ignore UPGRADE RELAY 13
      optimisticResponse,
    })
  })
}
