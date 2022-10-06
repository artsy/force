import { commitMutation, Environment, graphql } from "relay-runtime"
import { AuthIntentMutation } from "./types"
import { AuthIntentSaveArtworkMutation } from "__generated__/AuthIntentSaveArtworkMutation.graphql"

export const saveArtworkMutation: AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => {
  return new Promise((resolve, reject) => {
    commitMutation<AuthIntentSaveArtworkMutation>(relayEnvironment, {
      onCompleted: (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }

        resolve(res)
      },
      mutation: graphql`
        mutation AuthIntentSaveArtworkMutation($input: SaveArtworkInput!)
          @raw_response_type {
          saveArtwork(input: $input) {
            artwork {
              id
              isSaved
            }
          }
        }
      `,
      optimisticResponse: {
        saveArtwork: {
          artwork: {
            id,
            isSaved: true,
          },
        },
      },
      variables: {
        input: {
          artworkID: id,
        },
      },
    })
  })
}
